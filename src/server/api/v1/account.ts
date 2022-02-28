import { error, output } from '../../utils';
import { addresses } from '../../database/models/addresses';
import { transactions } from '../../database/models/transactions';
import { literal, Op, where } from 'sequelize';
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
  const search = {
    [Op.or]: {
      from_address_hash: address,
      to_address_hash: address
    }
  }

  if (r.query.withContracts) {
    include.push({
      model: token_transfers,
      as: 'token_transfers',
      right: false,
      attributes: []
    });

    search['Op.and'] = [where(literal('"token_transfers"."transaction_hash"'), Op.is, null)];
  }

  const { count, rows } = await transactions.findAndCountAll({
    where: search,
    include,
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ count, txs: rows });
}
