import { getBlockById, getBlocks } from '../../api/v1/block';
// import { blockSchemaWithTxs } from '../../database/schemes/block';
import { outputOkSchema, outputPaginationSchema, paginationSchema } from '../../database/schemes';
import * as Joi from 'joi'
import { blockSchema } from '../../database/schemes/block';
import { rawTransactionArray } from '../../database/schemes/transaction';

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
        blockSchema.keys({ transactions: rawTransactionArray }),
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
    description: 'Get block by id',
    validate: {
      params: Joi.object({
        blockNumber: Joi.string().required()
      }).label('GetBlockByIdParams')
    },
    response: {
      schema: outputOkSchema(
        blockSchema.keys({ transactions: rawTransactionArray }),
      ).label('GetBlockByIdResponse')
    }
  }
}]
