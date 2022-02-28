import { search } from '../../api/v1/search';
import * as Joi from 'joi';

export default [{
  method: 'GET',
  path: '/v1/search',
  handler: search,
  options: {
    id: 'v1.search.getSearch',
    tags: ['api', 'search'],
    description: 'Search in blocks, tx, addresses, tokens',
    validate: {
      query: Joi.object({
        q: Joi.string().max(255).required()
      }).label('SearchQuery')
    }
  }
}];
