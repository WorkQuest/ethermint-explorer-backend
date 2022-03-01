import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedHash } from '../../utils/address';
import { Block } from './Block';

@Table({ tableName: 'pending_block_operations' })
export class PendingBlockOperation extends Model {
  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  block_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  fetch_internal_transactions: boolean;
}
