import { TokenTransfer, Transaction, Address, Block, Logs, InternalTransaction } from '../../database';
import { convertHashToBuffer } from '../../utils/address';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { Op } from 'sequelize';

export async function getAllTransactions(r) {
  let { count, rows } = await Transaction.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}

export async function getTransactionByHash(r) {
  const transaction_hash = convertHashToBuffer(r.params.hash);

  const tx = await Transaction.findByPk(transaction_hash, {
    include: [{
      model: Address,
      as: 'from_address'
    }, {
      model: Block,
      as: 'block'
    }, {
      model: Address,
      as: 'to_address'
    }, {
      model: Address,
      as: 'contract'
    }, {
      model: TokenTransfer,
      as: 'token_transfers'
    }, {
      model: Logs,
      as: 'logs'
    }]
  });

  if (!tx) {
    return error(Errors.NotFound, 'Tx not found', {});
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
