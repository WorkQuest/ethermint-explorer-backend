import * as Joi from 'joi'

export const paginationFields = {
  limit: Joi.number().integer().default(10),
  offset: Joi.number().integer().default(0)
}
export const paginationSchema = Joi.object(paginationFields).label('PaginationSchema');

export const defaultCountSchema = Joi.number().integer().example(10);
export const hashSchema = Joi.string().regex(/0x[0-9a-f]{64}/).example('0x3a0db508c1e65c4add06603c911d8c307dfc226419906c927ea094ce800f83fd');
export const bech32AddressSchema = Joi.string().regex(/wq[0-9a-f]{39}/).example('wq1hr3d6dhtmz7vhp7gzecvgdaf9vpfv3nenzrgv7');
export const hexAddressSchema = Joi.string().regex(/0x[0-9a-f]{40}/).example('0x680d5ca4cfca05bbd4cbb5139768e37c73cefcd8');
export const valueStringSchema = Joi.string().example('50000000000000000');
export const valueNumberSchema = Joi.number().example(5000000000000);
export const blockNumberSchema = Joi.string().example('150000');
export const dateISOSchema = Joi.string().isoDate().example('2021-07-01T02:52:48+00:00');

export const addressSchema = Joi.object({
  hex: hexAddressSchema,
  bech32: bech32AddressSchema
}).label('Address');
