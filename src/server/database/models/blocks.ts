import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { transactions } from './transactions';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';

@Table
export class blocks extends Model {
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  consensus: boolean;

  @Column({ type: DataType.DECIMAL(50) })
  difficulty: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
  gas_limit: string;

  @Column({ type: DataType.DECIMAL(100), allowNull: false })
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

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedAddress = this.getDataValue('miner_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  miner_hash: any;

  @Column({ type: DataType.BLOB, allowNull: false })
  nonce: any;

  @Column({ type: DataType.BIGINT, allowNull: false })
  number: string;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedHash = this.getDataValue('parent_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  parent_hash: any;

  @Column({ type: DataType.INTEGER })
  size: number;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  timestamp: Date;

  @Column({ type: DataType.DECIMAL(50) })
  total_difficulty: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  refetch_needed: boolean;

  @Column({ type: DataType.DECIMAL(100) })
  base_fee_per_gas: string;

  @HasMany(() => transactions)
  transactions: transactions[];
}
