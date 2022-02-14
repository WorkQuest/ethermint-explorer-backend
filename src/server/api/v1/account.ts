import { error, output } from '../../utils';
import { addresses } from '../../database/models/addresses';
import { Errors } from '../../utils/errors';

export async function getAccountByAddress(r) {
  const addressWithPrefix = new Buffer(r.params.address.toUpperCase(), "hex");
  const accountWithPrefix = await addresses.findByPk(addressWithPrefix);

  const addressWithoutPrefix = new Buffer(r.params.address.slice(2).toUpperCase(), "hex")
  const accountWithoutPrefix = await addresses.findByPk(addressWithoutPrefix);
  // if (!account) return output({
  //   address: r.params.address,
  //   txsCount: 0,
  //   type: AccountType.Address,
  //   creatorTxId: null,
  //   creatorId: null,
  //   isERC20: false,
  //   balances: []
  // })

  return output({ accountWithPrefix, accountWithoutPrefix });
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
// export async function getAccountTxs(r) {
//   let {count, rows} = await Tx.findAndCountAll({
//     where: {
//       [Op.or]: {
//         fromAddress: r.params.address,
//         toAddress: r.params.address
//       }
//     },
//     order: [['timestamp', 'DESC']],
//     limit: r.query.limit,
//     offset: r.query.offset
//   });
//
//   return output({count, txs: rows});
// }
