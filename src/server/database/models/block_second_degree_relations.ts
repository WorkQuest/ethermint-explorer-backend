import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { blocks } from './blocks';

@Table
export class block_second_degree_relations extends Model {
  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  nephew_hash: any;

  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  uncle_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  uncle_fetched_at: Date;

  @Column({ type: DataType.INTEGER })
  index: number;
}
