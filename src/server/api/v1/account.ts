import { convertAddressToHex, convertHashToBuffer } from '../../utils/address';
import { output } from '../../utils';
import { literal, Op } from 'sequelize';
import {
  AddressCurrentTokenBalance,
  InternalTransaction,
  AddressCoinBalance,
  TokenTransfer,
  SmartContract,
  Transaction,
  Address,
  Block,
  Token,
  Logs,
} from '../../database';

export async function getAccountByAddress(r) {
  const { commonLimit } = r.query;
  const address = convertHashToBuffer(r.params.address);

  AddressCoinBalance.removeAttribute('id');

  const account = await Address.findByPk(address, {
    include: [{
      model: Token,
      as: 'token',
    }, {
      model: SmartContract,
      as: 'smartContract',
    }]
  });

  const addressCoinBalance = await AddressCoinBalance.findOne({
    attributes: { exclude: ['inserted_at', 'updated_at', 'block_number'] },
    where: { address_hash: address },
    order: [['block_number', 'DESC']],
  });

  const addressTokenBalances = await AddressCurrentTokenBalance.findAll({
    attributes: {
      exclude: ['id', 'block_number', 'inserted_at', 'updated_at', 'old_value'],
      include: [
        [literal('token.name'), 'name'],
        [literal('token.symbol'), 'symbol'],
        [literal('token.decimals'), 'decimals']
      ]
    },
    where: { address_hash: address },
    include: {
      model: Token,
      as: 'token',
      attributes: []
    },
    order: [['block_number', 'DESC']]
  });

  const createdContract = await Transaction.findOne({
    where: { created_contract_address_hash: address },
    attributes: ['from_address_hash', 'hash']
  });

  account.setDataValue('createdContract', createdContract);
  account.setDataValue('addressCoinBalance', addressCoinBalance);
  account.setDataValue('addressTokensBalances', addressTokenBalances);

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
      'hash',
      'error',
      'value',
      'status',
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

  const transactionWithTokensList = await Transaction.findAndCountAll({
    attributes: [
      'gas',
      'hash',
      'error',
      'value',
      'status',
      'gas_used',
      'gas_price',
      'block_number',
      'to_address_hash',
      'from_address_hash',
    ],
    include: [{
      model: TokenTransfer,
      as: 'tokenTransfers',
      required: true,
      where: {
        [Op.or]: {
          to_address_hash: address,
          from_address_hash: address
        }
      },
      attributes: ['token_contract_address_hash'],
      include: [{
        model: Address,
        as: 'tokenContractAddress',
        attributes: ['hash'],
        include: [{
          model: Token,
          as: 'token',
          attributes: ['name', 'decimals', 'symbol']
        }]
      }]
    }],
    order: [['block_number', 'DESC']],
    limit: r.query.commonLimit
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

  return output({ account, transactionsList, addressLogsList, tokenTransfersList, internalTransactionsList, transactionWithTokensList });
}

export async function getAccountLogs(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await Logs.findAndCountAll({
    where: {
      address_hash: address,
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
  });

  return output({ count, logs: rows });
}
