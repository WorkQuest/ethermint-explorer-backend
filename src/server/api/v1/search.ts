import { Address, Block, SmartContract, Token, Transaction } from '../../database';
import { getSearchType, SearchFilter, SearchType } from '../../utils/search';
import { convertHashToBuffer, getEmptyWallet } from '../../utils/address';
import { output } from '../../utils';
import { literal, Op } from 'sequelize';

async function getBlock(query) {
  const hash = convertHashToBuffer(query);

  let where: object = { hash };

  if (!query.startsWith('0x') && !isNaN(Number(query))) {
    where = { number: query }
  }

  const searchResult = await Block.findOne({
    where,
    attributes: {
      include: [[literal(`(SELECT COUNT(transactions.hash) FROM "transactions" WHERE "Block".hash = "transactions"."block_hash")`), 'transactionsCount']],
    }
  });

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
      as: 'token',
      required: extraParams
    }, {
      model: SmartContract,
      as: 'smartContract',
      required: false
    }]
  });

  if (!searchResult) {
    return { searchResult: getEmptyWallet(query), searchType: SearchType.Address };
  }

  if (searchResult.token) {
    return { searchResult, searchType: SearchType.Token };
  }

  if (searchResult.smartContract) {
    return { searchResult, searchType: SearchType.Contract };
  }

  return { searchResult, searchType: SearchType.Address };
}

async function getTokenByName(query) {
  const searchResult = await Address.findAndCountAll({
    include: [{
      model: Token,
      as: 'token',
      required: true,
      where: {
        [Op.or]: {
          name: { [Op.iLike]: `%${query}%` },
          symbol: { [Op.iLike]: `%${query}%` }
        }
      },
    }, {
      model: SmartContract,
      as: 'smartContract'
    }]
  });

  return { searchResult, searchType: SearchType.TokenName };
}

async function autodetectSearch(type: SearchType, q: string, extraParams?: any) {
  if (type === SearchType.Block) {
    const result = await getBlock(q);

    return result;
  }

  if (type === SearchType.BlockOrTx) {
    const blockResult = await getBlock(q);
    const txResult = await getTransaction(q);

    return blockResult.searchType === SearchType.None ? txResult : blockResult;
  }

  if (type === SearchType.TokenName) {
    const result = await getTokenByName(q);

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

  switch (r.query.type) {
    case SearchFilter.Address: {
      const result = await getAddress(q)

      return output(result);
    }

    case SearchFilter.TransactionHash: {
      const result = await getTransaction(q);

      return output(result);
    }

    case SearchFilter.Block: {
      const result = await getBlock(q);

      return output(result);
    }

    case SearchFilter.Token: {
      const result = type === SearchType.TokenName ?
        await getTokenByName(q) : await getAddress(q, true);

      return output(result);
    }

    default: {
      const result = await autodetectSearch(type, q);

      return output(result);
    }
  }
}