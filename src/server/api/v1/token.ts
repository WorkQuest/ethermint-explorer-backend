import { token_transfers } from '../../database/models/token_transfers'
import { output } from '../../utils';
import { convertHashToBuffer } from '../../utils/address';

export async function getTokenTransfers(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await token_transfers.findAndCountAll({
    where: { token_contract_address_hash: address },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, txs: rows });
}
