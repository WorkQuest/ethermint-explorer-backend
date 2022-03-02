import * as Joi from 'joi';
import {
  addressSchema,
  blockNumberNumberSchema,
  dateISOSchema,
  smallStringValueSchema,
  valueStringSchema
} from './index';
import { blockTimestampSchema } from './block';

export const shortTransactionSchema = Joi.object({
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  gas: valueStringSchema,
  error: Joi.string(),
  value: valueStringSchema,
  gas_used: valueStringSchema,
  gas_price: smallStringValueSchema,
  block_number: blockNumberNumberSchema,
  block: blockTimestampSchema
}).label('ShortTransaction');

export const shortInternalTransactionSchema = Joi.object({
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  error: Joi.string(),
  value: valueStringSchema,
  block_number: blockNumberNumberSchema,
  block: blockTimestampSchema
}).label('ShortTransaction');
