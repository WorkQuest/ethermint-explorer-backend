import { getSearchType, SearchFilter, SearchType } from '../../utils/search';
import { SmartContract } from '../../database/models/SmartContract';
import { Transaction } from '../../database/models/Transaction';
import { convertHashToBuffer } from '../../utils/address';
import { Address } from '../../database/models/Address';
import { Block } from '../../database/models/Block';
import { Token } from '../../database/models/Token';
import { output } from '../../utils';
import { Op } from 'sequelize';

async function getBlock(query) {
  const hash = convertHashToBuffer(query);

  let where: object = { hash };

  if (!query.startsWith('0x') && !isNaN(Number(query))) {
    where = { number: query }
  }

  const searchResult = await Block.findOne({ where });

  const searchType = searchResult ? SearchType.Block : SearchType.None;

  return { searchResult, searchType };
}

async function getTransaction(query) {
  const hash = convertHashToBuffer(query);

  const searchResult = await Transaction.findByPk(hash);

  const searchType = searchResult ? SearchType.Transaction : SearchType.None;

  return { searchResult, searchType };
}

async function getAddress(query, extraParams = false) {
  const hash = convertHashToBuffer(query);

  const searchResult = await Address.findOne({
    where: { hash },
    include: [{
      model: Token,
      as: 'addressToken',
      required: extraParams
    }, {
      model: SmartContract,
      as: 'addressContract',
      required: false
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
  const searchResult = await Address.findAndCountAll({
    include: [{
      model: Token,
      as: 'addressToken',
      required: true,
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${query}%` },
          symbol: { [Op.iLike]: `%${query}%` }
        }
      },
    }, {
      model: SmartContract,
      as: 'addressContract'
    }]
  });

  return { searchResult, searchType: SearchType.Tokens };
}

async function searchByType(type: SearchType, q: string, extraParams?: any) {
  if (type === SearchType.Block) {
    const result = await getBlock(q);

    return result;
  }

  if (type === SearchType.BlockOrTx) {
    const blockResult = await getBlock(q);
    const txResult = await getTransaction(q);

    return blockResult.searchType === SearchType.None ? txResult : blockResult;
  }

  if (type === SearchType.Tokens) {
    const result = await getTokens(q);

    return result;
  }

  if (type === SearchType.Address) {
    const result = await getAddress(q, extraParams);

    return result;
  }

  return { searchResult: null, searchType: type };
}

export async function search(r) {
  const { q } = r.query;
  const type = getSearchType(q);

  if (r.query.type !== undefined) {
    const { type } = r.query;

    if (type === SearchFilter.Addresses) {
      const result = await searchByType(SearchType.Address, q);

      return output(result);
    }

    if (type === SearchFilter.Tokens) {
      const result = await searchByType(SearchType.Address, q, true);

      return output(result);
    }

    if (type === SearchFilter.TokenName) {
      const result = await searchByType(SearchType.Tokens, q);

      return output(result);
    }

    return { searchResult: null, searchType: type };
  }

  return output(await searchByType(type, q));
}
