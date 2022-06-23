import * as Joi from 'joi';
import { addressSchema, dateISOSchema, smallStringValueSchema } from './index';

export const contractSchema = Joi.object({
  id: smallStringValueSchema,
  name: Joi.string(),
  compiler_version: Joi.string(),
  optimization: Joi.boolean(),
  contract_source_code: Joi.string(),
  abi: Joi.object(),
  address_hash: addressSchema,
  inserted_at: dateISOSchema,
  updated_at: dateISOSchema,
  constructor_arguments: Joi.string(),
  optimization_runs: Joi.string(),
  evm_version: Joi.string(),
  external_libraries: Joi.array().items(Joi.object()),
  verified_via_sourcify: Joi.boolean(),
  is_vyper_contract: Joi.boolean(),
  partially_verified: Joi.boolean(),
  file_path: Joi.string(),
  is_changed_bytecode: Joi.string(),
  bytecode_checked_at: dateISOSchema
}).label('Contract')
