import * as Joi from 'joi';
import {
  addressSchema, blockNumberStringSchema,
  dateISOSchema,
  hashSchema,
  hexDataSchema, smallNumberValueSchema,
  smallStringValueSchema,
  valueStringSchema
} from './index';

export const blockSchema = Joi.object({
  hash: hashSchema,
  miner_hash: addressSchema,
  nonce: hexDataSchema,
  parent_hash: hashSchema,
  consensus: Joi.boolean(),
  difficulty: smallStringValueSchema,
  gas_limit: valueStringSchema,
  gas_used: valueStringSchema,
  number: blockNumberStringSchema,
  size: smallNumberValueSchema,
  timestamp: dateISOSchema,
  total_difficulty: smallStringValueSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  refetch_needed: Joi.boolean(),
  base_fee_per_gas: smallStringValueSchema
}).label('Block')

export const blockTimestampSchema = Joi.object({
  timestamp: dateISOSchema
}).label('BlockTimestamp');
