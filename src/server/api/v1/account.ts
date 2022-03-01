import { Op } from 'sequelize';
import { Token } from '../../database/models/Token';
import { Address } from '../../database/models/Address';
import { Logs } from '../../database/models/Logs';
import { Block } from '../../database/models/Block';
import { Transaction } from '../../database/models/Transaction';
import { TokenTransfer } from '../../database/models/TokenTransfer';
import { InternalTransaction } from '../../database/models/InternalTransaction'
import { SmartContract } from '../../database/models/SmartContract';
import { AddressCoinBalance } from '../../database/models/AddressCoinBalance';
import { output } from '../../utils';
import { convertHashToBuffer } from '../../utils/address';

export async function getAccountByAddress(r) {
  const { commonLimit } = r.query;
  const address = convertHashToBuffer(r.params.address);

  const account = await Address.findByPk(address, {
    include: [{
      model: Token,
      as: 'addressToken',
    }, {
      model: SmartContract,
      as: 'addressContract',
    }, {
      model: AddressCoinBalance,
      as: 'addressCoinBalance',
      limit: 1,
      order: [['block_number', 'DESC']],
    }]
  });

  const addressLogsList = await Logs.findAndCountAll({
    where: {
      address_hash: address,
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const internalTransactionsList = await InternalTransaction.findAndCountAll({
    attributes: [
      'error',
      'value',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address,
      }
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const transactionsList = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'error',
      'value',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address,
      }
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  });

  const tokenTransfersList = await TokenTransfer.findAndCountAll({
    attributes: [
      'amount',
      'to_address_hash',
      'transaction_hash',
      'from_address_hash',
      'token_contract_address_hash',
    ],
    include: {
      as: 'block',
      model: Block,
      attributes: ['timestamp']
    },
    where: {
      token_contract_address_hash: address,
    },
    limit: commonLimit,
    order: [['block_number', 'DESC']],
  })

  return output({ account, transactionsList, addressLogsList, tokenTransfersList, internalTransactionsList });
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

  const { count, rows } = await Transaction.findAndCountAll({
    where: {
      [Op.or]: {
        from_address_hash: address,
        to_address_hash: address
      }
    },
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ count, txs: rows });
}
