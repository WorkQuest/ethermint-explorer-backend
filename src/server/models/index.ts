import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { Account } from './Account';
import { Balance } from './Balance';
import { Block } from './Block';
import { Token } from './Token';
import { Tx } from './Tx';
import { Event } from './Event';

export async function initDatabase(){
  const sequelize = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    models: [
      Account,
      Balance,
      Block,
      Token,
      Tx,
      Event,
    ],
  });
  await sequelize.sync();
  return sequelize;
}
