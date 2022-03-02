import * as Joi from 'joi';
import {
  addressSchema,
  blockNumberNumberSchema,
  dateISOSchema,
  hashSchema,
  hexDataSchema,
} from './index';

export const logSchema = Joi.object({
  data: hexDataSchema,
  address_hash: addressSchema,
  transaction_hash: hashSchema,
  block_hash: hashSchema,
  index: Joi.number().example(1),
  type: Joi.string(),
  first_topic: hexDataSchema,
  second_topic: hexDataSchema,
  third_topic: hexDataSchema,
  fourth_topic: hexDataSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  block_number: blockNumberNumberSchema
}).label('Log');
