import * as Joi from 'joi'
import { capitalize } from "sequelize-typescript/dist/shared/string";

export const paginationFields = {
  limit: Joi.number().integer().default(10),
  offset: Joi.number().integer().default(0)
}
export const paginationSchema = Joi.object(paginationFields).label('PaginationSchema');

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => {
  return Joi.object({
    ok: Joi.boolean().example(true),
    result: res
  });
};

export const outputEmptyOkSchema = Joi.object({
  ok: Joi.boolean().example(true)
})

export function outputPaginationSchema(title: string, item: Joi.Schema, label: string): Joi.Schema {
  return Joi.object({
    ok: Joi.boolean().example(true),
    result: Joi.object({
      count: Joi.number().integer().example(10),
      [title]: Joi.array().items(item).label(capitalize(title) + 'List')
    }).label(label)
  })
}

export function getPaginationBySchema(schema: Joi.Schema, title: string = 'rows'): Joi.Schema {
  return Joi.object({
    count: smallNumberValueSchema,
    [title]: Joi.array().items(schema).label(capitalize(title) + 'List')
  }); // TODO: add label?
}

export const defaultCountSchema = Joi.number().integer().example(10);
export const hashSchema = Joi.string().regex(/0x[0-9a-f]{64}/).example('0x3a0db508c1e65c4add06603c911d8c307dfc226419906c927ea094ce800f83fd');
export const bech32AddressSchema = Joi.string().regex(/wq[0-9a-f]{39}/).example('wq1hr3d6dhtmz7vhp7gzecvgdaf9vpfv3nenzrgv7');
export const hexAddressSchema = Joi.string().regex(/0x[0-9a-f]{40}/).example('0x680d5ca4cfca05bbd4cbb5139768e37c73cefcd8');
export const valueStringSchema = Joi.string().example('50000000000000000');
export const valueNumberSchema = Joi.number().example(5000000000000);
export const smallStringValueSchema = Joi.string().example('20');
export const smallNumberValueSchema = Joi.number().example(20);
export const hexDataSchema = Joi.string().example('0x608E35B...');
export const stringDataSchema = Joi.string().example('294620473638...')
export const blockNumberStringSchema = Joi.string().example('150000');
export const blockNumberNumberSchema = Joi.number().example(150000);
export const dateISOSchema = Joi.string().isoDate().example('2021-07-01T02:52:48+00:00');

export const addressSchema = Joi.object({
  hex: hexAddressSchema,
  bech32: bech32AddressSchema
}).label('Address');
