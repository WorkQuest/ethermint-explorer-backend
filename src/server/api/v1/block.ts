import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { blocks } from '../../database/models/blocks';
import { transactions } from '../../database/models/transactions';

export async function getBlocks(r) {
  const { count, rows } = await blocks.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['timestamp', 'DESC']]
  });

  return output({ count, blocks: rows })
}

export async function getBlockById(r) {
  const block = await blocks.findOne({
    where: { number: r.params.blockNumber },
    include: [{
      model: transactions,
      as: 'transactions'
    }],
  });

  if (!block)
    return error(Errors.NotFound, 'Block not found', {})

  return output(block);
}
