import {
  Column, DataType, HasMany, Model, Table
} from 'sequelize-typescript';
import { Tx } from './Tx';

@Table({
  defaultScope: {
    attributes: ['id', 'timestamp', 'size', 'gasLimit', 'gasUsed', 'hash', 'txsCount']
  }
})
export class Block extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  }) id: number;

  @Column(DataType.DATE) timestamp: string;

  @Column(DataType.DECIMAL) size: number;

  @Column(DataType.DECIMAL) gasLimit: number;

  @Column(DataType.DECIMAL) gasUsed: number;

  @Column(DataType.STRING) hash: string;

  @Column(DataType.INTEGER) txsCount: string;

  @HasMany(() => Tx) txs: Tx[];
}
