import * as Joi from 'joi';
import * as handlers from '../../api/v1/account';
import { getAccountInternalTransactions } from '../../api/v1/account';

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
}, {
  method: 'GET',
  path: '/v1/account/{address}/logs',
  handler: handlers.getAccountLogs,
  options: {
    id: 'v1.account.getAccountLogs',
    tags: ['api', 'account'],
    description: 'Get account logs',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountLogsParams'),
      query: Joi.object({
        // limit: ,
        // offset: ,
      }).label('GetAccountLogsQuery'),
    }
  }
}];
