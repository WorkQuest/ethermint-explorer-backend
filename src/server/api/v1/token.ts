import { token_transfers } from '../../database/models/token_transfers'
import { output } from '../../utils';

export async function getTokenTransfers(r) {
  let { count, rows } = await token_transfers.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}
