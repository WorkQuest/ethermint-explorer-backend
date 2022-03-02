import { TokenTransfer, Transaction, Address, Block, Logs, InternalTransaction, Token } from '../../database';
import { convertHashToBuffer } from '../../utils/address';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { Op } from 'sequelize';

export async function getAllTransactions(r) {
  const { count, rows } = await Transaction.findAndCountAll({
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
        as: 'tokenContractAddressHash',
        include: [{
          model: Token,
          as: 'addressToken',
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
      'error',
      'value',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address
      }
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