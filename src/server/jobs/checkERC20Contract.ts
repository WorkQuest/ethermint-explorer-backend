import { Helpers } from 'graphile-worker';
import { addJob } from '../utils/scheduler';
import Web3 from 'web3';
import config from '../config/config';
import erc20ABI from '../utils/erc20ABI';
import { nullAddress } from '../utils';
import { Token } from '../models/Token';
import { addParseHistoricalERC20Events } from './parseHistoricalERC20Events';
import { Account } from '../models/Account';

export interface CheckERC20ContractPayload {
  contract: string;
}

export async function addCheckERC20ContractJob(p: CheckERC20ContractPayload) {
  await addJob('checkERC20Contract', p);
}

export default async function (p: CheckERC20ContractPayload, h: Helpers) {
  // TODO: Maybe use better solution without web3
  let web3 = new Web3(config.rpc.ws);

  // @ts-ignore // TODO: solve this ts issue
  let contract = new web3.eth.Contract(erc20ABI, p.contract);

  let tokenInfo = {
    name: '',
    symbol: '',
    decimals: 18,
    totalSupply: ''
  };

  try {
    let [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.methods.name().call(),
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
      contract.methods.totalSupply().call(),
      contract.methods.balanceOf(nullAddress).call(),
      contract.methods.allowance(nullAddress, nullAddress).call()
      // TODO: validate transfer and transferFrom
    ]);
    tokenInfo.name = name;
    tokenInfo.symbol = symbol;
    tokenInfo.decimals = parseInt(decimals);
    tokenInfo.totalSupply = totalSupply;
  } catch (e) {
    return true;
  }

  await Token.create({
    id: p.contract,
    symbol: tokenInfo.symbol,
    name: tokenInfo.name,
    decimals: tokenInfo.decimals,
    totalSupply: tokenInfo.totalSupply,
    contractAddress: p.contract
  });
  await Account.update({ isERC20: true }, { where: { id: p.contract } });

  await addParseHistoricalERC20Events({
    tokenId: p.contract
  });
}
