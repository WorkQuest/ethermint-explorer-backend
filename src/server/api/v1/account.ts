import { Account, AccountType } from '../../models/Account';
import { output } from '../../utils';
import { Balance } from '../../models/Balance';
import { Tx } from '../../models/Tx';
import { Op } from 'sequelize';
import { Token } from '../../models/Token';

export async function getAccountByAddress(r) {
  let account = await Account.findByPk(r.params.address, {
    include: [{
      model: Balance,
      include: [{
        model: Token
      }]
    }]
  });
  if (!account) return output({
    address: r.params.address,
    txsCount: 0,
    type: AccountType.Address,
    creatorTxId: null,
    creatorId: null,
    isERC20: false,
    balances: []
  })

  return output(account);
}

export async function getAccountBalances(r) {
  let {count, rows} = await Balance.findAndCountAll({
    where: {
      accountAddress: r.params.address
    },
    limit: r.query.limit,
    offset: r.query.offset,
    include: [{
      model: Token,
      attributes: ['name', 'symbol', 'decimals', 'totalSupply']
    }]
  });

  return output({ count, balances: rows });
}

export async function getAccountTxs(r) {
  let {count, rows} = await Tx.findAndCountAll({
    where: {
      [Op.or]: {
        fromAddress: r.params.address,
        toAddress: r.params.address
      }
    },
    order: [['timestamp', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({count, txs: rows});
}
