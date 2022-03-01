import * as Joi from 'joi';
import * as handlers from '../../api/v1/account';
import { addressSchema, paginationSchema } from '../../schemes';

export default [{
  method: 'GET',
  path: '/v1/account/{address}',
  handler: handlers.getAccountByAddress,
  options: {
    id: 'v1.account.getByAddress',
    tags: ['api', 'account'],
    description: 'Get account by address',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountByAddressParams'),
      query: Joi.object({
        commonLimit: Joi.number().default(25).label('AccountCommonLimit'),
      }).label('GetAccountByAddressQuery')
    }
  }
},
  // {
  // method: 'GET',
  // path: '/v1/account/{address}/balances',
  // handler: getAccountBalances,
  // options: {
  //   id: 'v1.account.getAccountBalances',
  //   tags: ['api', 'account'],
  //   description: 'Get account balances',
  //   validate: {
  //     params: Joi.object({
  //       address: addressSchema.required()
  //     }).label('GetAccountBalancesParams'),
  //     query: paginationSchema
  //   }
  // }
// }
];
