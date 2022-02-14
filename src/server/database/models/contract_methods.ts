import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class contract_methods extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  identifier: number;

  @Column({ type: DataType.JSONB, allowNull: false })
  abi: object;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
