import { Address } from '../../database';
import { col, fn } from 'sequelize';
import { output } from '../../utils';

export async function getCoinCirculatingSupply() {
  const circulatingSupply = await Address.findOne({
    attributes: [
      [fn('SUM', col('fetched_coin_balance')), 'value'],
    ]
  });

  return output({ supply: circulatingSupply.getDataValue('value') });
}