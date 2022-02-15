import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { blocks } from './blocks';
import { parseBufferedHash } from '../../utils/address';

@Table
export class pending_block_operations extends Model {
  @ForeignKey(() => blocks)
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
