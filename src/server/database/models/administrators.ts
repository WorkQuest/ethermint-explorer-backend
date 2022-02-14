import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { users } from './users';

@Table
export class administrators extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  role: string;

  @ForeignKey(() => users)
  @Column({ type: DataType.BIGINT, allowNull: false, onDelete: 'cascade' })
  user_id: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
