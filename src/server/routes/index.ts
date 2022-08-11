import block from './v1/block';
import account from './v1/account';
import tx from './v1/transaction';
import token from './v1/token';
import search from './v1/search';
import coin from './v1/coin';

export default [
  ...token,
  ...block,
  ...account,
  ...tx,
  ...search,
  ...coin
];
