import * as Joi from 'joi';
import {
  addressSchema,
  dateISOSchema, hashSchema,
  smallNumberValueSchema,
  smallStringValueSchema,
  valueStringSchema
} from './index';
import { blockTimestampSchema } from './block';

export const tokenNameSchema = Joi.string().example('WorkQuest Token').label('TokenName');
export const tokenSymbolSchema = Joi.string().example('WQT').label('TokenSymbol');
export const tokenTypeSchema = Joi.string().example('ERC-20');

export const tokenSchema = Joi.object({
  contract_address_hash: addressSchema,
  name: tokenNameSchema,
  symbol: tokenSymbolSchema,
  total_supply: valueStringSchema,
  decimals: smallStringValueSchema,
  type: tokenTypeSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  holder_count: smallNumberValueSchema,
  bridged: Joi.boolean(),
  skip_metadata: Joi.boolean(),
}).label('Token');

export const shortTokenTransferSchema = Joi.object({
  amount: valueStringSchema,
  to_address_hash: addressSchema,
  from_address_hash: addressSchema,
  transaction_hash: hashSchema,
  token_contract_address_hash: addressSchema,
  block: blockTimestampSchema
}).label('ShortTokenTransfer');
