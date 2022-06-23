export const enum SearchType {
  Block = 0,
  Transaction,
  BlockOrTx,
  Contract,
  Address,
  TokenName,
  Token,
  None
}

export const enum SearchFilter {
  Address = 0,
  TransactionHash,
  Block,
  Token
}

export function getSearchType(query: string): SearchType {
  if (!query.startsWith('0x') && !query.startsWith('wq1') && !isNaN(Number(query))) {
    return SearchType.Block;
  }

  if (!query.startsWith('0x') && !query.startsWith('wq1')) {
    return SearchType.TokenName;
  }

  if (query.length === 42 || query.length === 41) {
    return SearchType.Address;
  }

  if (query.length === 66) {
    return SearchType.BlockOrTx;
  }

  return SearchType.None;
}
