import { convertHashToBuffer } from '../../utils/address';
import { Logs } from '../../database';
import { output } from '../../utils';
import { Op } from 'sequelize';

export async function getEventsByContract(r) {
  let where = {
    address_hash: convertHashToBuffer(r.params.contract)
  };

  if (r.query.minBlock || r.query.maxBlock){
    if (r.query.minBlock && r.query.maxBlock)
      where['block_number'] = {[Op.between]: [r.query.minBlock, r.query.maxBlock]}
    else if(r.query.minBlock)
      where['block_number'] = {[Op.gte]: r.query.minBlock}
    else
      where['block_number'] = {[Op.lte]: r.query.maxBlock}
  }

  const { count, rows } = await Logs.findAndCountAll({
    where,
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['block_number', 'DESC']]
  });

  return output({ count, events: rows })
}
