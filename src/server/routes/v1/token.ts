import { getTokenTransfers } from '../../api/v1/token'
import { paginationSchema } from '../../schemes';

export default [{
  method: 'GET',
  path: '/v1/token/{address}/transfers',
  handler: getTokenTransfers,
  options: {
    id: 'v1.token.getTokenTransfers',
    tags: ['api', 'token'],
    description: 'Get all transfer by token',
    validate: {
      query: paginationSchema
    }
  }
}];
