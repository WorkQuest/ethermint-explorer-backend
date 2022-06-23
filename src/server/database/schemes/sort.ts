import * as Joi from 'joi';
import { Schema } from 'joi';

export const sortTypeSchema = Joi.string().valid('ASC', 'DESC').default('DESC');

export function getSortBySchema(schema: Schema, defaultValue: string) {
  return Joi.object({
    field: schema,
    type: sortTypeSchema
  }).default({
    field: defaultValue,
    type: 'DESC'
  });
}

export const getBlocksSortSchema = Joi.string().valid(
  'number',
  'timestamp',
  'gas_used',
  'gas_limit'
).default('number');

export const getTransactionsSortSchema = Joi.string().valid(
  'hash',
  'block.timestamp',
  'block_number',
  'from_address_hash',
  'to_address_hash',
  'value',
  'gas_used'
).default('block_number');

export const getTokenTransfersSortSchema = Joi.string().valid(
  'transaction_hash',
  'block.timestamp',
  'from_address_hash',
  'to_address_hash',
  'amount'
).default('block.timestamp');

export const getTokensSortSchema = Joi.string().valid(
  'name',
  'symbol',
  'holder_count'
).default('holder_count');

export const getHoldersSort = Joi.string().valid('value').default('value');

