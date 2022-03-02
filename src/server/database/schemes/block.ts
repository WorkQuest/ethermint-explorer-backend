import * as Joi from 'joi';
import { dateISOSchema } from './index';

export const blockIdSchema = Joi.number().integer().example(12312);


export const blockSchema = Joi.object({
  id: blockIdSchema,

}).label('Block')

export const blockTimestampSchema = Joi.object({
  timestamp: dateISOSchema
}).label('BlockTimestamp');
