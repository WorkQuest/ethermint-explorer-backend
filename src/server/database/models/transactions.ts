import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { blocks } from './blocks';
import { addresses } from './addresses';
import { parseBufferedAddress } from '../../utils/address';
import { token_transfers } from './token_transfers';

@Table
export class transactions extends Model {
  @Column({ type: DataType.DECIMAL(100) })
  cumulative_gas_used: string;

  @Column({ type: DataType.STRING })
  error: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  gas: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  gas_price: string;

  @Column({ type: DataType.DECIMAL(100) })
  gas_used: string;

  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  hash: any;

  @Column({ type: DataType.INTEGER })
  index: number;

  @Column({ type: DataType.BLOB, allowNull: false })
  input: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  nonce: number;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  r: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  S: string;

  @Column({ type: DataType.INTEGER })
  status: number;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  v: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  value: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, onDelete: 'cascade' })
  block_hash: any;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('from_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  from_address_hash: any;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('to_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  to_address_hash: any;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('created_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  created_contract_address_hash: any;

  @Column({ type: 'TIMESTAMP' })
  created_contract_code_indexed_at: Date;

  @Column({ type: 'TIMESTAMP' })
  earliest_processing_start: Date;

  @Column({ type: DataType.BLOB })
  old_block_hash: any;

  @Column({ type: DataType.TEXT })
  revert_reason: string;

  @Column({ type: DataType.DECIMAL(100) })
  max_priority_fee_per_gas: string;

  @Column({ type: DataType.DECIMAL(100) })
  max_fee_per_gas: string;

  @Column({ type: DataType.INTEGER })
  type: number;

  @BelongsTo(() => addresses, 'from_address_hash') from_address: addresses;
  @BelongsTo(() => addresses, 'to_address_hash') to_address: addresses;
  @BelongsTo(() => addresses, 'created_contract_address_hash') contract: addresses;
  @BelongsTo(() => blocks) block: blocks;
  @HasMany(() => token_transfers) token_transfers: token_transfers[];
}
