import { convertHashToBuffer } from '../../utils/address';
import { TokenTransfer, Token, AddressCurrentTokenBalance, Block, Address } from '../../database';
import { output } from '../../utils';
import { fn, literal, Op } from 'sequelize';

export async function getTokenTransfers(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await TokenTransfer.findAndCountAll({
    where: { token_contract_address_hash: address },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}

export async function getAccountTokenTransfers(r) {
  const accountAddress = convertHashToBuffer(r.params.accountAddress);
  const tokenAddress = convertHashToBuffer(r.params.tokenAddress);

  const { count, rows } = await TokenTransfer.findAndCountAll({
    where: {
      [Op.and]: {
        [Op.or]: {
          from_address_hash: accountAddress,
          to_address_hash: accountAddress
        },
        token_contract_address_hash: tokenAddress
      }
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, txs: rows });
}

export async function getToken(r) {
  const address = convertHashToBuffer(r.params.address);
  const token = await Token.findByPk(address);

  const transfersList = await TokenTransfer.findAndCountAll({
    where: { token_contract_address_hash: address },
    attributes: ['transaction_hash', 'from_address_hash', 'to_address_hash', 'amount', 'token_contract_address_hash'],
    include: {
      model: Block,
      as: 'block',
      attributes: ['timestamp']
    },
    order: [['block_number', 'DESC']],
    limit: r.query.commonLimit,
  });

  const holdersList = await AddressCurrentTokenBalance.findAndCountAll({
    where: { token_contract_address_hash: address },
    attributes: ['address_hash', 'value', 'value_fetched_at'],
    order: [['value_fetched_at', 'DESC']],
    limit: r.query.commonLimit,
  });

  return output({ token, transfersList, holdersList });
}

export async function getTokens(r) {
  const { rows, count } = await Token.findAndCountAll({
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['holder_count', 'DESC']],
  });

  return output({ tokens: rows, count });
}

export async function getTokenHolders(r) {
  const address = convertHashToBuffer(r.params.address);
  const { count, rows } = await AddressCurrentTokenBalance.findAndCountAll({
    where: { token_contract_address_hash: address },
    attributes: ['address_hash', 'value', 'value_fetched_at'],
    order: [['value_fetched_at', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ holders: rows, count });
}

export async function getAllTokenTransfers(r) {
  const { count, rows } = await TokenTransfer.findAndCountAll({
    attributes: ['transaction_hash', 'from_address_hash', 'to_address_hash', 'amount', 'token_contract_address_hash'],
    include: [{
      model: Block,
      as: 'block',
      attributes: ['timestamp']
    }, {
      model: Address,
      as: 'tokenContractAddress',
      attributes: ['hash'],
      include: [{
        model: Token,
        as: 'token',
        attributes: ['name', 'symbol']
      }]
    }],
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset,
  });

  return output({ transfers: rows, count });
}
