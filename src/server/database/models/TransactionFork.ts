import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedHash } from '../../utils/address';
import { Transaction } from './Transaction';
import { Block } from './Block';

@Table({ tableName: 'transaction_forks' })
export class TransactionFork extends Model {
  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  hash: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  index: number;

  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('uncle_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  uncle_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
