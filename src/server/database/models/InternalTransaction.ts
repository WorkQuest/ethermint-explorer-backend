import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';
import { Address } from './Address';
import { Transaction } from './Transaction';
import { Block } from './Block';

@Table({ tableName: 'internal_transactions' })
export class InternalTransaction extends Model {
  @Column({ type: DataType.STRING })
  call_type: string;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('created_contract_code');

      return parseBufferedHash(bufferedHash);
    },
  })
  created_contract_code: any;

  @Column({ type: DataType.STRING })
  error: string;

  @Column({ type: DataType.DECIMAL(100) })
  gas: any;

  @Column({ type: DataType.DECIMAL(100) })
  gas_used: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  index: number;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('init');

      return parseBufferedHash(bufferedHash);
    },
  })
  init: any;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('input');

      return parseBufferedHash(bufferedHash);
    },
  })
  input: any;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('output');

      return parseBufferedHash(bufferedHash);
    },
  })
  output: any;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false })
  trace_address: number[];

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  value: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('created_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  created_contract_address_hash: any;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('from_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  from_address_hash: any;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('to_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  to_address_hash: any;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('transaction_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  transaction_hash: string;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @Column({ type: DataType.INTEGER })
  transaction_index: number;

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

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  block_index: number;
}
