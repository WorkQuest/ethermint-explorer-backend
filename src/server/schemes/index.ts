import * as Joi from 'joi'

export const paginationFields = {
  limit: Joi.number().integer().default(10),
  offset: Joi.number().integer().default(0)
}
export const paginationSchema = Joi.object(paginationFields).label('PaginationSchema');

export const defaultCountSchema = Joi.number().integer().example(10)
export const hashSchema = Joi.string().regex(/0x[0-9a-f]{64}/).example('0x3a0db508c1e65c4add06603c911d8c307dfc226419906c927ea094ce800f83fd')
export const addressSchema = Joi.string().regex(/0x[0-9a-f]{40}/).example('0x680d5ca4cfca05bbd4cbb5139768e37c73cefcd8')
export const dateISOSchema = Joi.string().isoDate().example('2021-07-01T02:52:48+00:00')
