import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { transactions } from './transactions';
import { blocks } from './blocks';
import { parseBufferedHash } from '../../utils/address';

@Table
export class transaction_forks extends Model {
  @ForeignKey(() => transactions)
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

  @ForeignKey(() => blocks)
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
