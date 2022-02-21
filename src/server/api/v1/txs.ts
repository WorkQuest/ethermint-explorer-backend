import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { transactions } from '../../database/models/transactions';
import { addresses } from '../../database/models/addresses';
import { blocks } from '../../database/models/blocks';
import { tokens } from '../../database/models/tokens';
import { logs } from '../../database/models/logs';
import { token_transfers } from '../../database/models/token_transfers';
import { convertHashToBuffer } from '../../utils/address';

export async function getAllTxs(r) {
  let { count, rows } = await transactions.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}

export async function getTxByHash(r) {
  const transaction_hash = convertHashToBuffer(r.params.hash);

  const tx = await transactions.findByPk(transaction_hash, {
    include: [{
      model: addresses,
      as: 'from_address'
    }, {
      model: blocks,
      as: 'block'
    }, {
      model: addresses,
      as: 'to_address'
    }, {
      model: tokens,
      as: 'token'
    }, {
      model: addresses,
      as: 'contract'
    }, {
      model: token_transfers,
      as: 'token_transfers'
    }, {
      model: logs,
      as: 'logs'
    }]
  });

  if (!tx) {
    return error(Errors.NotFound, 'Tx not found', {});
  }

  return output(tx);
}
