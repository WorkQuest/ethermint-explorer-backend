import { Tx } from '../../models/Tx';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { Account } from '../../models/Account';
import { Block } from '../../models/Block';
import { Token } from '../../models/Token';

export async function getAllTxs(r) {
  let {count, rows} = await Tx.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['timestamp', 'DESC']]
  });

  return output({count, txs: rows})
}

export async function getTxByHash(r) {
  let tx = await Tx.findByPk(r.params.hash, {
    include: [{
      model: Account,
      as: 'from'
    }, {
      model: Block,
    }, {
      model: Account,
      as: 'to'
    }, {
      model: Account,
      as: 'contract'
    }, {
      model: Token
    }]
  });
  if (!tx) return error(Errors.NotFound, 'Tx not found', {});

  return output(tx);
}
