import * as handlers from '../../api/v1/search';
import * as Joi from 'joi';

export default [{
  method: 'GET',
  path: '/v1/search',
  handler: handlers.search,
  options: {
    id: 'v1.search.getSearch',
    tags: ['api', 'search'],
    description: 'Search in blocks, tx, addresses, tokens\nFilter: 0 - Address, 1 - Tx hash, 2 - Block, 3 - Token',
    validate: {
      query: Joi.object({
        q: Joi.string().max(255).required(),
        type: Joi.number().valid(0, 1, 2, 3),
      }).label('SearchQuery')
    }
  }
}];
