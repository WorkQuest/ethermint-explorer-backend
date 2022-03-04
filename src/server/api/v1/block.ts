import { Transaction, Block } from '../../database';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { col, fn, literal } from 'sequelize';

export async function getBlocks(r) {
  const { count, rows } = await Block.findAndCountAll({
    attributes: {
      exclude: ['consensus', 'difficulty', 'total_difficulty', 'inserted_at', 'updated_at', 'refetch_needed', 'nonce'],
      include: [[literal(`(SELECT COUNT(transactions.hash) FROM "transactions" WHERE "Block".hash = "transactions"."block_hash")`), 'transactionsCount']],
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['timestamp', 'DESC']]
  });

  return output({ count, blocks: rows })
}

export async function getBlockById(r) {
  const block = await Block.findOne({
    where: { number: r.params.blockNumber },
    attributes: {
      include: [[literal(`(SELECT COUNT(transactions.hash) FROM "transactions" WHERE "Block".hash = "transactions"."block_hash")`), 'transactionsCount']],
    },
  });

  if (!block) {
    return error(Errors.NotFound, 'Block not found', {});
  }

  return output(block);
}

export async function getTransactionsByBlock(r) {
  const { rows, count } = await Transaction.findAndCountAll({
    where: { block_number: r.params.blockNumber },
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
    offset: r.query.offset
  });

  return output({ transactions: rows, count });
}
