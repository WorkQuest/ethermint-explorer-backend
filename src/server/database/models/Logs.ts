import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';
import { Address } from './Address';
import { Transaction } from './Transaction';
import { Block } from './Block';

@Table({ tableName: 'logs' })
export class Logs extends Model {
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedHash = this.getDataValue('data');

      return parseBufferedHash(bufferedHash);
    },
  })
  data: any;

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  index: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  first_topic: string;

  @Column({ type: DataType.STRING })
  second_topic: string;

  @Column({ type: DataType.STRING })
  third_topic: string;

  @Column({ type: DataType.STRING })
  fourth_topic: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  address_hash: any;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('transaction_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  transaction_hash: string;

  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  block_hash: any;

  @Column({ type: DataType.INTEGER })
  block_number: number;
}
