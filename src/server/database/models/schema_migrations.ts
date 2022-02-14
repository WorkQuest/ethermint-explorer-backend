import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class schema_migrations extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, primaryKey: true })
  version: string;

  @Column({ type: 'TIMESTAMP(0)', allowNull: false })
  inserted_at: Date;
}
