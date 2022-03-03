import * as Joi from 'joi';
import { logArray } from './logs';
import { shortAccountSchema } from './account';
import { tokenTransferOnlyAmountArray } from './token';
import { blockSchema, blockTimestampSchema } from './block';
import {
  hashSchema,
  hexDataSchema,
  dateISOSchema,
  addressSchema,
  stringDataSchema,
  valueStringSchema,
  smallStringValueSchema,
  smallNumberValueSchema,
  blockNumberNumberSchema,
} from './index';

export const shortTransactionSchema = Joi.object({
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  gas: valueStringSchema,
  hash: hashSchema,
  error: Joi.string(),
  value: valueStringSchema,
  status: Joi.number().example(1),
  gas_used: valueStringSchema,
  gas_price: smallStringValueSchema,
  block_number: blockNumberNumberSchema,
  block: blockTimestampSchema
}).label('ShortTransaction');

export const shortTransactionWithTransfersSchema = Joi.object({
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  gas: valueStringSchema,
  hash: hashSchema,
  error: Joi.string(),
  value: valueStringSchema,
  gas_used: valueStringSchema,
  gas_price: smallStringValueSchema,
  block_number: blockNumberNumberSchema,
  block: blockTimestampSchema,
  tokenTransfers: tokenTransferOnlyAmountArray
}).label('shortTransactionWithTransfers');

export const shortInternalTransactionSchema = Joi.object({
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  error: Joi.string(),
  value: valueStringSchema,
  block_number: blockNumberNumberSchema,
  block: blockTimestampSchema
}).label('ShortTransaction');

export const transactionSchema = Joi.object({
  hash: hashSchema,
  input: hexDataSchema,
  block_hash: hashSchema,
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  created_contract_address_hash: addressSchema,
  old_block_hash: hashSchema,
  cumulative_gas_used: valueStringSchema,
  error: Joi.string(),
  gas: valueStringSchema,
  gas_price: valueStringSchema,
  gas_used: valueStringSchema,
  index: Joi.number().example(1),
  nonce: smallNumberValueSchema,
  r: stringDataSchema,
  s: stringDataSchema,
  status: Joi.number().example(1),
  v: stringDataSchema,
  value: valueStringSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  block_number: blockNumberNumberSchema,
  created_contract_code_indexed_at: dateISOSchema,
  earliest_processing_start: dateISOSchema,
  revert_reason: Joi.string(),
  max_priority_fee_per_gas: smallStringValueSchema,
  max_fee_per_gas: smallStringValueSchema,
  type: Joi.number().example(1),
  fromAddress: shortAccountSchema,
  toAddress: shortAccountSchema,
  block: blockSchema,
  createdContractAddress: shortAccountSchema,
  tokenTransfers: tokenTransferOnlyAmountArray,
  logs: logArray
}).label('Transaction');

export const rawTransactionSchema = Joi.object({
  hash: hashSchema,
  input: hexDataSchema,
  block_hash: hashSchema,
  from_address_hash: addressSchema,
  to_address_hash: addressSchema,
  created_contract_address_hash: addressSchema,
  old_block_hash: hashSchema,
  cumulative_gas_used: valueStringSchema,
  error: Joi.string(),
  gas: valueStringSchema,
  gas_price: valueStringSchema,
  gas_used: valueStringSchema,
  index: Joi.number().example(1),
  nonce: smallNumberValueSchema,
  r: stringDataSchema,
  s: stringDataSchema,
  status: Joi.number().example(1),
  v: stringDataSchema,
  value: valueStringSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  block_number: blockNumberNumberSchema,
  created_contract_code_indexed_at: dateISOSchema,
  earliest_processing_start: dateISOSchema,
  revert_reason: Joi.string(),
  max_priority_fee_per_gas: smallStringValueSchema,
  max_fee_per_gas: smallStringValueSchema,
  type: Joi.number().example(1),
}).label('RawTransaction')

export const rawTransactionArray = Joi.array().items(rawTransactionSchema).label('RawTransactionArray');
