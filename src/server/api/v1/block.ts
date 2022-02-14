// import { Block } from '../../models/Block';
// import { error, output } from '../../utils';
// import { Errors } from '../../utils/errors';
// import { Tx } from '../../models/Tx';
//
// export async function getBlocks(r) {
//   const {count, rows} = await Block.findAndCountAll({
//     limit: r.query.limit,
//     offset: r.query.offset,
//     order: [['timestamp', 'DESC']]
//   });
//
//   return output({count, blocks: rows})
// }
//
// export async function getBlockById(r) {
//   const block = await Block.findByPk(r.params.blockId, {
//     include: [{
//       model: Tx,
//       as: 'txs'
//     }]
//   });
//
//   if (!block)
//     return error(Errors.NotFound, 'Block not found', {})
//
//   return output(block);
// }
