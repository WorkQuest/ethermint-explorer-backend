import { transactions } from '../../database/models/transactions';
import { getSearchType, SearchType } from '../../utils/search';
import { convertHashToBuffer } from '../../utils/address';
import { blocks } from '../../database/models/blocks';
import { output } from '../../utils';
import { Op } from 'sequelize';
import { addresses } from '../../database/models/addresses';
import { tokens } from '../../database/models/tokens';
import { smart_contracts } from '../../database/models/smart_contracts';

async function getBlock(query) {
  const hash = convertHashToBuffer(query);

  const where = isNaN(Number(query)) ? { hash } : { number: query };

  const result = await blocks.findAndCountAll({ where });

  const type = result.count === 0 ? SearchType.None : SearchType.Block;

  return { ...result, type };
}

async function getTransaction(query) {
  const hash = convertHashToBuffer(query);

  const result = await transactions.findAndCountAll({
    where: { hash }
  });

  const type = result.count === 0 ? SearchType.None : SearchType.Transaction;

  return { ...result, type };
}

async function getAddress(query) {
  const hash = convertHashToBuffer(query);

  const result = await addresses.findAndCountAll({
    where: { hash },
    include: [{
      model: tokens,
      as: 'addressToken'
    }, {
      model: smart_contracts,
      as: 'addressContract'
    }]
  });

  if (result.count === 0) {
    return { ...result, type: SearchType.None };
  }

  const [address] = result.rows;

  if (address.addressToken) {
    return { ...result, type: SearchType.Token };
  }

  if (address.addressContract) {
    return { ...result, type: SearchType.Contract };
  }

  return { ...result, type: SearchType.Address };
}

async function getTokens(query) {
  const result = await addresses.findAndCountAll({
    include: [{
      model: tokens,
      as: 'addressToken',
      required: true,
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${query}%` },
          symbol: { [Op.iLike]: `%${query}%` }
        }
      },
    }, {
      model: smart_contracts,
      as: 'addressContract'
    }]
  });

  const type = result.count === 0 ? SearchType.None : SearchType.Token;

  return { ...result, type };
}

export async function search(r) {
  const { q } = r.query;
  const type = getSearchType(q);

  if (type === SearchType.Block) {
    const result = await getBlock(q);

    return output(result);
  }

  if (type === SearchType.BlockOrTx) {
    const blockResult = await getBlock(q);
    const txResult = await getTransaction(q);

    return output(blockResult.type === SearchType.None ? txResult : blockResult);
  }

  if (type === SearchType.Token) {
    const result = await getTokens(q);

    return output(result);
  }

  if (type === SearchType.Address) {
    const result = await getAddress(q);

    return output(result);
  }

  return output({ rows: [], count: 0, type });
}
