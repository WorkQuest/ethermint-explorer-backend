import { TokenTransfer, Transaction, Address, Block, Logs } from '../../database';
import { convertHashToBuffer } from '../../utils/address';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';

export async function getAllTxs(r) {
  let { count, rows } = await Transaction.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}

export async function getTxByHash(r) {
  const transaction_hash = convertHashToBuffer(r.params.hash);

  const tx = await Transaction.findByPk(transaction_hash, {
    include: [{
      model: Address,
      as: 'from_address'
    }, {
      model: Block,
      as: 'block'
    }, {
      model: Address,
      as: 'to_address'
    }, {
      model: Address,
      as: 'contract'
    }, {
      model: TokenTransfer,
      as: 'token_transfers'
    }, {
      model: Logs,
      as: 'logs'
    }]
  });

  if (!tx) {
    return error(Errors.NotFound, 'Tx not found', {});
  }

  return output(tx);
}
