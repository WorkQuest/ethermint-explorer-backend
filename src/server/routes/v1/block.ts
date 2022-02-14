import { getBlockById, getBlocks } from '../../api/v1/block';
import { paginationSchema } from '../../schemes';
import * as Joi from 'joi'
import { blockIdSchema } from '../../schemes/block';
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
    }
  }
}, {
  method: 'GET',
  path: '/v1/block/{blockId}',
  handler: getBlockById,
  options: {
    id: 'v1.block.getById',
    tags: ['api', 'block'],
    description: 'Get block by id',
    validate: {
      params: Joi.object({
        blockNumber: blockIdSchema.required()
      }).label('GetBlockByIdParams')
    }
  }
}]
