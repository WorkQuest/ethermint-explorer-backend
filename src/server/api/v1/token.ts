import { convertHashToBuffer } from '../../utils/address';
import { TokenTransfer, Token } from '../../database';
import { error, output } from '../../utils';
import { Errors } from '../../utils/errors';
import { Op } from 'sequelize';

export async function getTokenTransfers(r) {
  const address = convertHashToBuffer(r.params.address);

  const { count, rows } = await TokenTransfer.findAndCountAll({
    where: { token_contract_address_hash: address },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']],
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
          to_address_hash: accountAddress,
        },
        token_contract_address_hash: tokenAddress
      }
    },
    order: [['block_number', 'DESC']],
    limit: r.query.limit,
    offset: r.query.offset
  });

  return output({ count, txs: rows })
}

export async function getToken(r) {
  const address = convertHashToBuffer(r.params.address);
  const token = await Token.findByPk(address);

  if (!token) {
    return error(Errors.NotFound, 'Token not found', { field: ['address'] });
  }

  return output(token);
}
