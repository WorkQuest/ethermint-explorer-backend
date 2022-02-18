import block from './v1/block';
import account from './v1/account';
import tx from './v1/tx';
import token from './v1/token';

export default [
  ...token,
  ...block,
  ...account,
  ...tx
];
