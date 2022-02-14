import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { transactions } from './transactions';
import { blocks } from './blocks';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class internal_transactions extends Model {
  @Column({ type: DataType.STRING })
  call_type: string;

  @Column({ type: DataType.BLOB })
  created_contract_code: any;

  @Column({ type: DataType.STRING })
  error: string;

  @Column({ type: DataType.DECIMAL(100) })
  gas: any;

  @Column({ type: DataType.DECIMAL(100) })
  gas_used: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  index: number;

  @Column({ type: DataType.BLOB })
  init: any;

  @Column({ type: DataType.BLOB })
  input: any;

  @Column({ type: DataType.BLOB })
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

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('created_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  created_contract_address_hash: any;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('from_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  from_address_hash: any;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('to_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  to_address_hash: any;

  @ForeignKey(() => transactions)
  @Column({ type: DataType.BLOB, allowNull: false, onDelete: 'cascade' })
  transaction_hash: string;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @Column({ type: DataType.INTEGER })
  transaction_index: number;

  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  block_hash: any;

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  block_index: number;
}
