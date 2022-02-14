import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { blocks } from './blocks';

@Table
export class block_rewards extends Model {
  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB, allowNull: false })
  address_hash: any;

  @Column({ type: DataType.STRING, allowNull: false })
  address_type: string;

  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, allowNull: false, onDelete: 'cascade' })
  block_hash: any;

  @Column({ type: DataType.DECIMAL(100) })
  reward: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
