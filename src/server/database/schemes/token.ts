import * as Joi from 'joi';
import { blockTimestampSchema } from './block';
import {
  addressSchema, blockNumberNumberSchema,
  dateISOSchema, hashSchema,
  smallNumberValueSchema,
  smallStringValueSchema,
  valueStringSchema
} from './index';

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

export const tokenTransferSchema = Joi.object({
  transaction_hash: hashSchema,
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  token_contract_address_hash: addressSchema,
  block_hash: hashSchema,
  log_index: Joi.number().example(0),
  amount: valueStringSchema,
  token_id: smallStringValueSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  block_number: blockNumberNumberSchema
}).label('TokenTransfer');

export const shortTokenTransferSchema = Joi.object({
  amount: valueStringSchema,
  to_address_hash: addressSchema,
  from_address_hash: addressSchema,
  transaction_hash: hashSchema,
  token_contract_address_hash: addressSchema,
  block: blockTimestampSchema
}).label('ShortTokenTransfer');

export const tokenHolderSchema = Joi.object({
  address_hash: addressSchema,
  value: valueStringSchema,
  value_fetched_at: dateISOSchema
}).label('TokenHolder');

export const tokenTransferOnlyAmountSchema = Joi.object({
  amount: valueStringSchema
}).label('TokenTransferOnlyAmount')

export const tokenTransferOnlyAmountArray = Joi.array()
  .items(tokenTransferOnlyAmountSchema)
  .label('TokenTransferOnlyAmountArray');
