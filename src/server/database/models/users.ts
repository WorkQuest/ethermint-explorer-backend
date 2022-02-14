import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class users extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
