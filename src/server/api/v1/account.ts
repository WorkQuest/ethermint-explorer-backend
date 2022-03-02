import { convertHashToBuffer } from '../../utils/address';
import { output } from '../../utils';
import { Op } from 'sequelize';
import {
  InternalTransaction,
  AddressCoinBalance,
  TokenTransfer,
  SmartContract,
  Transaction,
  Address,
  Block,
  Token,
  Logs,
} from '../../database';

export async function getAccountByAddress(r) {
  const { commonLimit } = r.query;
  const address = convertHashToBuffer(r.params.address);

  AddressCoinBalance.removeAttribute('id');

  const account = await Address.findByPk(address, {
    include: [{
      model: Token,
      as: 'addressToken',
    }, {
      model: SmartContract,
      as: 'addressContract',
    }]
  });

  const addressCoinBalance = await AddressCoinBalance.findOne({
    where: { address_hash: address },
    order: [['block_number', 'DESC']],
  });

  account.setDataValue('addressCoinBalance', addressCoinBalance);

  const addressLogsList = await Logs.findAndCountAll({
    where: {
      address_hash: address,
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const internalTransactionsList = await InternalTransaction.findAndCountAll({
    attributes: [
      'error',
      'value',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address,
      }
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const transactionsList = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'error',
      'value',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address,
      }
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const tokenTransfersList = await TokenTransfer.findAndCountAll({
    attributes: [
      'amount',
      'to_address_hash',
      'transaction_hash',
      'from_address_hash',
      'token_contract_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      token_contract_address_hash: address,
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  })

  return output({ account, transactionsList, addressLogsList, tokenTransfersList, internalTransactionsList });
}

export async function getAccountLogs(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await Logs.findAndCountAll({
    where: {
      address_hash: address,
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, logs: rows });
}
