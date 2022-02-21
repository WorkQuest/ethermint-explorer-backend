import { token_transfers } from '../../database/models/token_transfers'
import { output } from '../../utils';
import { convertHashToBuffer } from '../../utils/address';
import { Op } from 'sequelize';

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


export async function getAccountTokenTransfers(r) {
  const accountAddress = convertHashToBuffer(r.params.accountAddress);
  const tokenAddress = convertHashToBuffer(r.params.tokenAddress);

  const { count, rows } = await token_transfers.findAndCountAll({
    where: {
      [Op.and]: {
        [Op.or]: {
          from_address_hash: accountAddress,
          to_address_hash: accountAddress,
        },
        token_contract_address_hash: tokenAddress
      }
    },
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ count, txs: rows })
}
