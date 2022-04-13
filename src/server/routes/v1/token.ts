import * as handlers from '../../api/v1/token';
import {
  getPaginationBySchema,
  outputOkSchema,
  outputPaginationSchema,
  paginationSchema,
} from '../../database/schemes';
import * as Joi from 'joi';
import {
  shortTokenTransferSchema,
  tokenHolderSchema,
  tokenSchema,
  tokenTransferSchema, tokenTransferWithTokenSchema, tokenWithMetadataSchema
} from '../../database/schemes/token';

export default [{
  method: 'GET',
  path: '/v1/token/{address}',
  handler: handlers.getToken,
  options: {
    id: 'v1.token.getToken',
    tags: ['api', 'token'],
    description: 'Get token',
    validate: {
      params: Joi.object({
        address: Joi.string().required(),
      }).label('GetTokenParams'),
      query: Joi.object({
        commonLimit: Joi.number().default(25)
      }).label('GetTokenQuery')
    },
    response: {
      schema: outputOkSchema(Joi.object({
        token: tokenWithMetadataSchema,
        transfersList: getPaginationBySchema(shortTokenTransferSchema),
        holdersList: getPaginationBySchema(tokenHolderSchema)
      })).label('GetTokenResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/token/{address}/transfers',
  handler: handlers.getTokenTransfers,
  options: {
    id: 'v1.token.getTokenTransfers',
    tags: ['api', 'token'],
    description: 'Get all transfer by token',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountByAddressParams'),
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('txs', shortTokenTransferSchema, 'GetTokenTransfersSchema')
        .label('GetTokenTransfersResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/token/{tokenAddress}/account/{accountAddress}/transfers',
  handler: handlers.getAccountTokenTransfers,
  options: {
    id: 'v1.token.getTokenTransfersByAccount',
    tags: ['api', 'token'],
    description: 'Get token transfers by account',
    validate: {
      params: Joi.object({
        accountAddress: Joi.string().required(),
        tokenAddress: Joi.string().required()
      }).label('GetAccountTokenTransfersParams'),
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('txs', tokenTransferSchema, 'GetAccountTokenTransfersSchema')
        .label('GetAccountTokenTransfersResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/tokens',
  handler: handlers.getTokens,
  options: {
    id: 'v1.token.getTokens',
    tags: ['api', 'token'],
    description: 'Get tokens list',
    validate: {
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('tokens', tokenSchema, 'GetTokensSchema')
        .label('GetTokensResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/token/{address}/holders',
  handler: handlers.getTokenHolders,
  options: {
    id: 'v1.token.getTokenHolders',
    tags: ['api', 'token'],
    description: 'Get token holders',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetTokenHoldersParams'),
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('holders', tokenHolderSchema, 'GetTokenHoldersSchema')
        .label('GetTokenHoldersResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/token/transfers',
  handler: handlers.getAllTokenTransfers,
  options: {
    id: 'v1.token.getAllTokenTransfers',
    tags: ['api', 'token'],
    description: 'Get all token transfers',
    validate: {
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('transfers', tokenTransferWithTokenSchema, 'GetAllTokenTransfersSchema')
        .label('GetAllTokenTransfersResponse')
    }
  }
}];
