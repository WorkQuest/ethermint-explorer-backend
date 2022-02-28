export const enum SearchType {
  Block = 0,
  Transaction,
  BlockOrTx,
  Contract,
  Address,
  Tokens,
  Token,
  None
}

export function getSearchType(hash: string): SearchType {
  if (hash.startsWith('0x') && !isNaN(Number(hash))) {
    return SearchType.Block;
  }

  if (!hash.startsWith('0x')) {
    return SearchType.Tokens;
  }

  if (hash.length === 42) {
    return SearchType.Address;
  }

  if (hash.length === 66) {
    return SearchType.BlockOrTx;
  }

  return SearchType.None;
}
