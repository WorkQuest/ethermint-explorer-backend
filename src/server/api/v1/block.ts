import { Transaction } from '../../database/models/Transaction';
import { Block } from '../../database/models/Block';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';

export async function getBlocks(r) {
  const { count, rows } = await Block.findAndCountAll({
    include: [{
      model: Transaction,
      as: 'transactions',
      required: false
    }],
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['timestamp', 'DESC']]
  });

  return output({ count, blocks: rows })
}

export async function getBlockById(r) {
  const block = await Block.findOne({
    where: { number: r.params.blockNumber },
    include: [{
      model: Transaction,
      as: 'transactions'
    }],
  });

  if (!block)
    return error(Errors.NotFound, 'Block not found', {})

  return output(block);
}
