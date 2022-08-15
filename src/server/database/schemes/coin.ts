import * as Joi from 'joi';
import { valueStringSchema } from './index';

export const coinCirculatingSupplySchema = Joi.object({
  supply: valueStringSchema,
}).label('CoinCirculatingSupply');