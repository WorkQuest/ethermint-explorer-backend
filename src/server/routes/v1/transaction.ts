import * as Joi from 'joi';
import * as handlers from '../../api/v1/transaction';
import { paginationSchema } from '../../database/schemes';

export default [{
  method: 'GET',
  path: '/v1/transactions',
  handler: handlers.getAllTransactions,
  options: {
    id: 'v1.transaction.getAllTransactions',
    tags: ['api', 'transaction'],
    description: 'Get all Transactions',
    validate: {
      query: paginationSchema
    }
  }
}, {
  method: 'GET',
  path: '/v1/transaction/{hash}',
  handler: handlers.getTransactionByHash,
  options: {
    id: 'v1.transaction.getTransactionByHash',
    tags: ['api', 'transaction'],
    description: 'Get transaction by hash',
    validate: {
      params: Joi.object({
        hash: Joi.string().required(),
      }).label('GetTransactionByHashParams')
    }
  }
}, {
  method: 'GET',
  path: '/v1/account/{address}/transactions',
  handler: handlers.getAccountTransactions,
  options: {
    id: 'v1.account.getTransactions',
    tags: ['api', 'transaction'],
    description: 'Get account transactions',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountTransactionsParams'),
      query: paginationSchema,
    }
  }
}, {
  method: 'GET',
  path: '/v1/account/{address}/internal-transactions',
  handler: handlers.getAccountInternalTransactions,
  options: {
    id: 'v1.account.getInternalTransactions',
    tags: ['api', 'transaction'],
    description: 'Get account internal transactions',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountInternalTransactionsParams'),
      query: paginationSchema,
    }
  }
}];
