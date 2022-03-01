import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'user_contacts' })
export class UserContact extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  email: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false, unique: true, onDelete: 'cascade' })
  user_id: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  primary: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  verified: boolean;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
