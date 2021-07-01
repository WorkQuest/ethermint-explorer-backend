import { addJob } from '../utils/scheduler';
import { Event } from '../models/Event';
import erc20ABI from '../utils/erc20ABI';
import { nullAddress } from '../utils';
import { Balance } from '../models/Balance';
import { literal } from 'sequelize';

const abiDecoder = require('abi-decoder');
abiDecoder.addABI(erc20ABI);

export interface ParseERC20Event {
  eventId: string;
}

export async function addParseERC20EventJob(p: ParseERC20Event) {
  await addJob('parseERC20Event', p);
}

export default async function (p: ParseERC20Event) {
  let event = await Event.findByPk(p.eventId);
  if (!event) {
    return true;
  }

  let [tx] = await abiDecoder.decodeLogs([event.data]);
  if (tx.name !== 'Transfer') {
    return true;
  }

  const from = tx.events[0].value;
  const to = tx.events[1].value;
  const amount = tx.events[2].value;

  if (from !== nullAddress) {
    await Balance.decrementBalance(amount, from, tx.address);
  }
  if (to !== nullAddress) {
    await Balance.incrementBalance(amount, to, tx.address)
  }
}
