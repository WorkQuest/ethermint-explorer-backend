import * as Joi from 'joi';

export const blockIdSchema = Joi.number().integer().example(12312);


export const blockSchema = Joi.object({
  id: blockIdSchema,

}).label('Block')
