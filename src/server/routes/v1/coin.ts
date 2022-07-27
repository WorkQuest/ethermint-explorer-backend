import * as handlers from '../../api/v1/coin';
import { outputOkSchema } from '../../database/schemes';
import { coinCirculatingSupplySchema } from '../../database/schemes/coin';

export default [{
  method: 'GET',
  path: '/coin/circulating-supply',
  handler: handlers.getCoinCirculatingSupply,
  options: {
    id: 'v1.coin.getCoinCirculatingSupply',
    tags: ['api', 'coin'],
    description: 'Get coin circulating supply',
    response: {
      schema: outputOkSchema(coinCirculatingSupplySchema)
        .label('GetCoinCirculatingSupplyResponse')
    }
  }
}];