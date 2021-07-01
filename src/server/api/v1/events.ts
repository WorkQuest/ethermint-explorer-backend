import { Event } from '../../models/Event';
import { Op } from 'sequelize';
import { output } from '../../utils';

export async function getEventsByContract(r) {
  let where = {
    contractAddress: r.params.contract
  };

  if (r.query.minBlock || r.query.maxBlock){
    if (r.query.minBlock && r.query.maxBlock)
      where['blockNumber'] = {[Op.between]: [r.query.minBlock, r.query.maxBlock]}
    else if(r.query.minBlock)
      where['blockNumber'] = {[Op.gte]: r.query.minBlock}
    else
      where['blockNumber'] = {[Op.lte]: r.query.maxBlock}
  }

  let {count, rows} = await Event.findAndCountAll({
    where,
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['timestamp', 'DESC']]
  });

  return output({count, events: rows})
}
