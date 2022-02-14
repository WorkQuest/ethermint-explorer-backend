// import { getAllTxs, getTxByHash } from '../../api/v1/txs';
// import { addressSchema, hashSchema, paginationSchema } from '../../schemes';
// import * as Joi from 'joi';
// import { getAccountTxs } from '../../api/v1/account';
//
// export default [{
//   method: 'GET',
//   path: '/v1/txs',
//   handler: getAllTxs,
//   options: {
//     id: 'v1.tx.getAll',
//     tags: ['api', 'tx'],
//     description: 'Get all txs',
//     validate: {
//       query: paginationSchema
//     }
//   }
// }, {
//   method: 'GET',
//   path: '/v1/tx/{hash}',
//   handler: getTxByHash,
//   options: {
//     id: 'v1.tx.getByHash',
//     tags: ['api', 'tx'],
//     description: 'Get tx by hash',
//     validate: {
//       params: Joi.object({
//         hash: hashSchema.required()
//       }).label('GetTxByHashParams')
//     }
//   }
// }, {
//   method: 'GET',
//   path: '/v1/account/{address}/txs',
//   handler: getAccountTxs,
//   options: {
//     id: 'v1.tx.getTxsByAccount',
//     tags: ['api', 'tx'],
//     description: 'Get txs by account',
//     validate: {
//       params: Joi.object({
//         address: addressSchema.required()
//       }).label('GetAllAccountTxsParams')
//     }
//   }
// }]
