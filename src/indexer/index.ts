import { getClient } from '@ethercast/eth-jsonrpc-client';
import { Block } from '../server/models/Block';
import { initDatabase } from '../server/models';
import { getTXByHash, getTxFee, hex2dec, sleep } from './utils';
import { Tx } from '../server/models/Tx';
import BigNumber from 'bignumber.js';
import { Account } from '../server/models/Account';
import { Op } from 'sequelize';
import { Balance } from '../server/models/Balance';
import { addCheckERC20ContractJob } from '../server/jobs/checkERC20Contract';
import config from '../server/config/config';
import { Event } from '../server/models/Event';
import { addParseERC20EventJob } from '../server/jobs/parseERC20Event';

const nullAddress = '0x0000000000000000000000000000000000000000';


export async function parseTx(cli, block, hash, timestamp) {
  let receipt = await cli.eth_getTransactionReceipt(hash);
  let txInfo = await getTXByHash(hash);
  await Account.createIfNotExist(txInfo.from);

  if (txInfo.to !== null) {
    await Account.createIfNotExist(txInfo.to);
    await Account.increment('txsCount', {
      where: {
        id: { [Op.in]: [txInfo.to] }
      },
    });
  }

  let tx = await Tx.create({
    id: receipt.transactionHash,
    blockNumber: block,
    timestamp: timestamp,
    fromAddress: txInfo.from,
    toAddress: txInfo.to,
    gasUsed: new BigNumber(receipt.gasUsed).toString(),
    gas: new BigNumber(txInfo.gas).toString(),
    logs: receipt.logs,
    gasPrice: new BigNumber(txInfo.gasPrice).toString(),
    value: new BigNumber(txInfo.value).toString(),
    contractAddress: null,
    tokenId: null,
    status: hex2dec(receipt.status),
    input: txInfo.input
  });
  // TODO: change balances
  await Account.increment('txsCount', {
    where: {
      id: { [Op.in]: [txInfo.from] }
    },
  });
  let eventIds: string[] = []
  if (receipt.logs.length !== 0){
    let contract : Account;
    if (txInfo.to === null) { // Should create contract account
      let [contractInst, isNew] = await Account.createContractAccount(receipt.contractAddress, txInfo.from, receipt.transactionHash)
      if (isNew)
        await addCheckERC20ContractJob({contract: receipt.contractAddress});
      contract = contractInst;
    } else {
      contract = await Account.findByPk(txInfo.to);
    }
    await tx.update({ contractAddress: contract.id });
    await contract.increment('txsCount', { where: { id: contract.id } });

    for (const log of receipt.logs){
      let event = await Event.create({
        contractAddress: contract.id,
        blockNumber: block,
        txHash: receipt.transactionHash,
        data: log,
      })
      if (contract.isERC20)
        eventIds.push(event.id)
    }
  }

  await Balance.decrementBalance(getTxFee(txInfo.gas, txInfo.gasPrice), txInfo.from, config.blockchain.coin);

  if (txInfo.value !== '0x0'){
    await Balance.decrementBalance(new BigNumber(txInfo.value).toString(), txInfo.from, config.blockchain.coin);
    await Balance.incrementBalance(new BigNumber(txInfo.value).toString(), txInfo.to, config.blockchain.coin);
  }
  return eventIds
}

export async function parseBlock(cli, sequelize, blockNumber: number) {
  let blockInfo = await cli.eth_getBlockByNumber(blockNumber, false);
  console.log('Try parsing block ', blockNumber);
  let block = await Block.create({
    id: hex2dec(blockInfo.number),
    timestamp: new Date(hex2dec(blockInfo.timestamp) * 1000),
    txsCount: blockInfo.transactions.length,
    size: hex2dec(blockInfo.size),
    gasLimit: hex2dec(blockInfo.gasLimit),
    gasUsed: hex2dec(blockInfo.gasUsed),
    hash: blockInfo.hash
  });

  let eventIds: string[] = []
  for (const hash of blockInfo.transactions) {
    let txEvents = await parseTx(cli, block.id, hash, block.timestamp);
    eventIds = [...eventIds, ...txEvents]
  }

  for (const eventId of eventIds){
    await addParseERC20EventJob({eventId})
  }
}

export async function workerAsyncFunction() {
  let sequelize = await initDatabase();
  const cli = await getClient(config.rpc.url, false);
  let latestParsedBlock = (await Block.findOne({ order: [['id', 'DESC']] }))?.id || 0;

  while (true) {
    try {
      await parseBlock(cli, sequelize, latestParsedBlock + 1);
      latestParsedBlock++;
    } catch (e) {
      console.log('Cannot parse block at height: ', latestParsedBlock + 1);
      await sleep(2000);
    }
  }

}

workerAsyncFunction();
