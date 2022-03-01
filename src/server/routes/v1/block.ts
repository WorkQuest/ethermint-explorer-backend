import { getBlockById, getBlocks } from '../../api/v1/block';
import { paginationSchema } from '../../database/schemes';
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
    }
  }
}]
