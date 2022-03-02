import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';
import { Block } from './Block';
import { Address } from './Address';
import { Logs } from './Logs';
import { TokenTransfer } from './TokenTransfer';
import { InternalTransaction } from './InternalTransaction';

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
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

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  hash: any;

  @Column({ type: DataType.INTEGER })
  index: number;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedHash = this.getDataValue('input');

      return parseBufferedHash(bufferedHash);
    },
  })
  input: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  nonce: number;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  r: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  s: string;

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

  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  block_hash: any;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @ForeignKey(() => Address)
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

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('to_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  to_address_hash: any;

  @ForeignKey(() => Address)
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

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('old_block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  old_block_hash: any;

  @Column({ type: DataType.TEXT })
  revert_reason: string;

  @Column({ type: DataType.DECIMAL(100) })
  max_priority_fee_per_gas: string;

  @Column({ type: DataType.DECIMAL(100) })
  max_fee_per_gas: string;

  @Column({ type: DataType.INTEGER })
  type: number;

  @BelongsTo(() => Block) block: Block;
  @BelongsTo(() => Address, 'to_address_hash') toAddress: Address;
  @BelongsTo(() => Address, 'from_address_hash') fromAddress: Address;
  @BelongsTo(() => Address, 'created_contract_address_hash') createdContractAddress: Address;

  @HasOne(() => InternalTransaction) internalTransaction: InternalTransaction;

  @HasMany(() => Logs) logs: Logs[];
  @HasMany(() => TokenTransfer) tokenTransfers: TokenTransfer[];
}
