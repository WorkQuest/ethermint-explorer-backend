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

  let where: object = { hash };

  if (!query.startOf(hash) && !isNaN(Number(query))) {
    where = { number: query }
  }

  const searchResult = await blocks.findOne({ where });

  const searchType = searchResult ? SearchType.Block : SearchType.None;

  return { searchResult, searchType };
}

async function getTransaction(query) {
  const hash = convertHashToBuffer(query);

  const searchResult = await transactions.findByPk(hash);

  const searchType = searchResult ? SearchType.Transaction : SearchType.None;

  return { searchResult, searchType };
}

async function getAddress(query) {
  const hash = convertHashToBuffer(query);

  const searchResult = await addresses.findByPk(hash, {
    include: [{
      model: tokens,
      as: 'addressToken'
    }, {
      model: smart_contracts,
      as: 'addressContract'
    }]
  });

  if (!searchResult) {
    return { searchResult, searchType: SearchType.None };
  }

  if (searchResult.addressToken) {
    return { searchResult, searchType: SearchType.Token };
  }

  if (searchResult.addressContract) {
    return { searchResult, searchType: SearchType.Contract };
  }

  return { searchResult, searchType: SearchType.Address };
}

async function getTokens(query) {
  const searchResult = await addresses.findAndCountAll({
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

  return { searchResult, searchType: SearchType.Tokens };
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

    return output(blockResult.searchType === SearchType.None ? txResult : blockResult);
  }

  if (type === SearchType.Tokens) {
    const result = await getTokens(q);

    return output(result);
  }

  if (type === SearchType.Address) {
    const result = await getAddress(q);

    return output(result);
  }

  return output({ searchResult: null, searchType: type });
}
