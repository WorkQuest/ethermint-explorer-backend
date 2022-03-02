import * as Joi from 'joi';
import { tokenSchema } from './token';
import {
  addressSchema,
  blockNumberStringSchema,
  dateISOSchema,
  hexDataSchema,
  smallNumberValueSchema,
  valueStringSchema
} from './index';
import { contractSchema } from './contract';

export const addressCoinBalanceSchema = Joi.object({
  address_hash: addressSchema,
  block_number: blockNumberStringSchema,
  value: valueStringSchema,
  value_fetched_at: dateISOSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema
}).label('AddressCoinBalance');

export const shortAccountSchema = Joi.object({
  hash: addressSchema,
  contractCode: hexDataSchema,
  fetched_coin_balance: valueStringSchema,
  fetched_coin_balance_block_number: blockNumberStringSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  nonce: smallNumberValueSchema,
  decompiled: Joi.boolean(),
  verified: Joi.boolean(),
}).label('ShortAccount');

export const accountSchema = Joi.object({
  hash: addressSchema,
  contractCode: hexDataSchema,
  fetched_coin_balance: valueStringSchema,
  fetched_coin_balance_block_number: blockNumberStringSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  nonce: smallNumberValueSchema,
  decompiled: Joi.boolean(),
  verified: Joi.boolean(),
  addressToken: tokenSchema,
  addressContract: contractSchema,
  addressCoinBalance: addressCoinBalanceSchema
}).label('Account');


