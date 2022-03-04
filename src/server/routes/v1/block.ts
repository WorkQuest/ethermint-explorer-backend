import { getBlockById, getBlocks, getTransactionsByBlock } from '../../api/v1/block';
import { blockSchema, shortBlockSchema } from '../../database/schemes/block';
import { shortTransactionSchema } from '../../database/schemes/transaction';
import {
  outputOkSchema,
  outputPaginationSchema,
  paginationSchema,
  smallStringValueSchema
} from '../../database/schemes';
import * as Joi from 'joi'

export default [{
  method: 'GET',
  path: '/v1/blocks',
  handler: getBlocks,
  options: {
    id: 'v1.block.getAll',
    tags: ['api', 'block'],
    description: 'Get all blocks',
    validate: {
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema(
        'blocks',
        shortBlockSchema,
        'GetBlocksSchema'
      ).label('GetBlocksResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/block/{blockNumber}',
  handler: getBlockById,
  options: {
    id: 'v1.block.getById',
    tags: ['api', 'block'],
    description: 'Get block',
    validate: {
      params: Joi.object({
        blockNumber: Joi.string().required()
      }).label('GetBlockByIdParams')
    },
    response: {
      schema: outputOkSchema(
        blockSchema.keys({ transactionsCount: smallStringValueSchema }),
      ).label('GetBlockByIdResponse')
    }
  }
}, {
  method: 'GET',
  path: '/v1/block/{blockNumber}/transactions',
  handler: getTransactionsByBlock,
  options: {
    id: 'v1.block.getTransactionsByBlock',
    tags: ['api', 'block'],
    description: 'Get transactions by block',
    validate: {
      params: Joi.object({
        blockNumber: Joi.string().required()
      }).label('GetTransactionsByBlockParams'),
      query: paginationSchema
    },
    response: {
      schema: outputPaginationSchema('transactions', shortTransactionSchema, 'GetTransactionsByBlockSchema')
        .label('GetTransactionsByBlockResponse')
    }
  }
}]
