import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Account } from './Account';
import { Block } from './Block';
import { Tx } from './Tx';

@Table
export class Event extends Model{
  @Column({type: DataType.STRING, defaultValue: getUUID, primaryKey: true}) id: string;

  @ForeignKey(() => Account)
  @Column(DataType.STRING) contractAddress: string;

  @ForeignKey(() => Block)
  @Column(DataType.INTEGER) blockNumber: number;

  @ForeignKey(() => Tx)
  @Column(DataType.STRING) txHash: string;

  @Column(DataType.JSONB) data: object;


  @BelongsTo(() => Account) contract: Account;
  @BelongsTo(() => Block) block: Block;
  @BelongsTo(() => Tx) tx: Tx;
}
