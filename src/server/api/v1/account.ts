import { error, output } from '../../utils';
import { addresses } from '../../database/models/addresses';
import { transactions } from '../../database/models/transactions';
import { Op } from 'sequelize';
import { convertHashToBuffer } from '../../utils/address';
import { token_transfers } from '../../database/models/token_transfers';

export async function getAccountByAddress(r) {
  const address = convertHashToBuffer(r.params.address);
  const account = await addresses.findByPk(address);

  return output(account);
}

// export async function getAccountBalances(r) {
//   let {count, rows} = await Balance.findAndCountAll({
//     where: {
//       accountAddress: r.params.address
//     },
//     limit: r.query.limit,
//     offset: r.query.offset,
//     include: [{
//       model: Token,
//       attributes: ['name', 'symbol', 'decimals', 'totalSupply']
//     }]
//   });
//
//   return output({ count, balances: rows });
// }
//
export async function getAccountTxs(r) {
  const address = convertHashToBuffer(r.params.address);
  const include = [];

  if (r.query.withContracts) {
    include.push({
      model: token_transfers,
      as: 'token_transfers',
      right: true,
      required: false,
      attributes: []
    });
  }

  const { count, rows } = await transactions.findAndCountAll({
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address
      }
    },
    include,
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ count, txs: rows });
}
