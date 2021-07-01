import { addJob } from '../utils/scheduler';
import { Event } from '../models/Event';
import parseERC20Event from './parseERC20Event';

export interface ParseHistoricalERC20Events {
  tokenId: string;
}

export async function addParseHistoricalERC20Events(p: ParseHistoricalERC20Events){
  await addJob('parseHistoricalERC20Events', p);
}

export default async function(p: ParseHistoricalERC20Events) {
  let events = await Event.findAll({
    where: {
      contractAddress: p.tokenId
    }
  });

  if (events.length === 0)
    return true;

  for (const event of events) {
    await parseERC20Event({eventId: event.id})
  }
}
