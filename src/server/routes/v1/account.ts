import * as Joi from 'joi';
import * as handlers from '../../api/v1/account';
import { accountSchema } from '../../database/schemes/account';
import { logSchema } from '../../database/schemes/logs';
import { shortTokenTransferSchema } from '../../database/schemes/token';
import { getPaginationBySchema, outputOkSchema, paginationSchema } from '../../database/schemes';
import {
  shortInternalTransactionSchema,
  shortTransactionSchema,
  transactionWithTokenSchema
} from '../../database/schemes/transaction';

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
    },
    response: {
      schema: outputOkSchema(
        Joi.object({
          account: accountSchema,
          transactionsList: getPaginationBySchema(shortTransactionSchema),
          addressLogsList: getPaginationBySchema(logSchema),
          tokenTransfersList: getPaginationBySchema(shortTokenTransferSchema),
          internalTransactionsList: getPaginationBySchema(shortInternalTransactionSchema),
          transactionWithTokensList: getPaginationBySchema(transactionWithTokenSchema),
        }).label('FullAccountSchema')
      ).label('GetAccountByAddressResponse'),
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
      query: paginationSchema
    }
  }
}];
