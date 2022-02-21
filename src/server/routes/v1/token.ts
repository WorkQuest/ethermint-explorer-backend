import { getAccountTokenTransfers } from '../../api/v1/token';
import { getTokenTransfers } from '../../api/v1/token'
import { paginationSchema } from '../../schemes';
import * as Joi from 'joi';

export default [{
  method: 'GET',
  path: '/v1/token/{address}/transfers',
  handler: getTokenTransfers,
  options: {
    id: 'v1.token.getTokenTransfers',
    tags: ['api', 'token'],
    description: 'Get all transfer by token',
    validate: {
      params: Joi.object({
        address: Joi.string().required()
      }).label('GetAccountByAddressParams'),
      query: paginationSchema
    }
  }
}, {
  method: 'GET',
  path: '/token/{tokenAddress}/account/{accountAddress}/transfers',
  handler: getAccountTokenTransfers,
  options: {
    id: 'v1.tx.getTokenTransfersByAccount',
    tags: ['api', 'token'],
    description: 'Get token transfers by account',
    validate: {
      params: Joi.object({
        accountAddress: Joi.string().required(),
        tokenAddress: Joi.string().required()
      }).label('GetAccountTokenTransfersParams'),
      query: paginationSchema
    }
  }
}];
