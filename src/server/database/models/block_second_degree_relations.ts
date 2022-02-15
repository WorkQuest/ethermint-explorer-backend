import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { blocks } from './blocks';
import { parseBufferedHash } from '../../utils/address';

@Table
export class block_second_degree_relations extends Model {
  @ForeignKey(() => blocks)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('nephew_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  nephew_hash: any;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('uncle_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  uncle_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  uncle_fetched_at: Date;

  @Column({ type: DataType.INTEGER })
  index: number;
}
