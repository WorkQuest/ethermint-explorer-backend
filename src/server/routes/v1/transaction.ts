import * as Joi from 'joi';
import * as handlers from '../../api/v1/transaction';
import { outputOkSchema, outputPaginationSchema, paginationFields, paginationSchema } from '../../database/schemes';
import {
  shortInternalTransactionSchema,
  shortTransactionSchema,
  shortTransactionWithTransfersSchema,
  transactionSchema, transactionWithTokenSchema
} from '../../database/schemes/transaction';
import { getHoldersSort, getSortBySchema, getTransactionsSortSchema } from '../../database/schemes/sort';

export default [{
  method: 'GET',
  path: '/v1/transactions',
  handler: handlers.getAllTransactions,
  options: {
    id: 'v1.transaction.getAllTransactions',
    tags: ['api', 'transaction'],
    description: 'Get all Transactions',
    validate: {
      query: Joi.object({
        ...paginationFields,
        sort: getSortBySchema(getTransactionsSortSchema, 'block_number')
      }).label('GetAllTransactionsQuery'),
    },
    response: {
      schema: outputPaginationSchema(
        'transactions',
        shortTransactionSchema,
        'GetAllTransactionsSchema'
      ).label('GetAllTransactionsResponse')
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
    },
    response: {
      schema: outputOkSchema(transactionSchema).label('GetTransactionByHashResponse'),
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
      query: Joi.object({
        ...paginationFields,
        sort: getSortBySchema(getTransactionsSortSchema, 'block_number')
      }).label('GetAccountTransactionsQuery'),
    },
    response: {
      schema: outputPaginationSchema(
        'transactions',
        shortTransactionWithTransfersSchema,
        'GetAccountTransactionSchema'
      ).label('GetAccountTransactionsResponse')
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
      query: Joi.object({
        ...paginationFields,
        sort: getSortBySchema(getTransactionsSortSchema, 'block_number')
      }).label('GetAccountInternalTransactionQuery'),
    },
    response: {
      schema: outputPaginationSchema(
        'transactions',
        shortInternalTransactionSchema,
        'GetAccountInternalTransactionsSchema'
      ).label('GetAccountInternalTransactionResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/account/{address}/token-transactions',
  handler: handlers.getTransactionsWithTokens,
  options: {
    id: 'v1.account.getTransactionsWithTokens',
    tags: ['api', 'transaction'],
    description: 'Get account transactions with tokens',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountTransactionsWithTokensParams'),
      query: Joi.object({
        ...paginationFields,
        sort: getSortBySchema(getTransactionsSortSchema, 'block_number')
      }).label('GetTransactionsWithTokensQuery'),
    },
    response: {
      schema: outputPaginationSchema(
        'transactions',
        transactionWithTokenSchema,
        'GetTransactionsWithTokensSchema'
      ).label('GetTransactionsWithTokensResponse')
    }
  }
}];
