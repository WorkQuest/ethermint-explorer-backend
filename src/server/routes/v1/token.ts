import * as handlers from '../../api/v1/token';
import { outputOkSchema, outputPaginationSchema, paginationSchema } from '../../database/schemes';
import * as Joi from 'joi';
import { tokenSchema, tokenTransferSchema } from '../../database/schemes/token';

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
      }).label('GetTokenParams')
    },
    response: {
      schema: outputOkSchema(tokenSchema).label('GetTokenResponse')
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
      schema: outputPaginationSchema('txs', tokenTransferSchema, 'GetTokenTransfersSchema')
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
}];
