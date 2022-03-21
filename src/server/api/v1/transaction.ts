import { Op } from 'sequelize';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { convertHashToBuffer } from '../../utils/address';
import {
  Logs,
  Token,
  Block,
  Address,
  Transaction,
  TokenTransfer,
  InternalTransaction,
} from '../../database';

export async function getAllTransactions(r) {
  const { count, rows } = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'hash',
      'error',
      'value',
      'status',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: [{
      as: 'block',
      model: Block,
      attributes: ['timestamp'],
    }],
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, transactions: rows });
}

export async function getTransactionByHash(r) {
  const transactionHash = convertHashToBuffer(r.params.hash);

  const tx = await Transaction.findByPk(transactionHash, {
    include: [{
      model: Address,
      as: 'fromAddress'
    }, {
      model: Block,
      as: 'block'
    }, {
      model: Address,
      as: 'toAddress'
    }, {
      model: Address,
      as: 'createdContractAddress'
    }, {
      model: TokenTransfer,
      as: 'tokenTransfers',
      attributes: ['amount'],
      include: [{
        attributes: [],
        model: Address,
        as: 'tokenContractAddress',
        include: [{
          model: Token,
          as: 'token',
          attributes: ['name', 'symbol', 'decimals'],
        }],
      }]
    }, {
      model: Logs,
      as: 'logs'
    }]
  });

  if (!tx) {
    return error(Errors.NotFound, 'Transaction not found', {});
  }

  return output(tx);
}

export async function getAccountTransactions(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'hash',
      'error',
      'value',
      'status',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    where: {
      [Op.or]: {
        to_address_hash: address,
        from_address_hash: address,
      },
    },
    include: [{
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    }, {
      as: 'tokenTransfers',
      model: TokenTransfer,
      attributes: ['amount'],
    }],
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, transactions: rows });
}

export async function getAccountInternalTransactions(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await InternalTransaction.findAndCountAll({
    attributes: [
      'error',
      'value',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address,
      }
    },
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, transactions: rows });
}

export async function getTransactionsWithTokens(r) {
  const address = convertHashToBuffer(r.params.address);

  const { rows, count } = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'hash',
      'error',
      'value',
      'status',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: [{
      model: TokenTransfer,
      as: 'tokenTransfers',
      required: true,
      where: {
        [Op.or]: {
          to_address_hash: address,
          from_address_hash: address
        }
      },
      attributes: ['token_contract_address_hash'],
      include: [{
        model: Address,
        as: 'tokenContractAddress',
        attributes: ['hash'],
        include: [{
          model: Token,
          as: 'token',
          attributes: ['name', 'decimals', 'symbol']
        }]
      }]
    }],
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ transactions: rows, count });
}
