import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'schema_migrations' })
export class SchemaMigration extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, primaryKey: true })
  version: string;

  @Column({ type: 'TIMESTAMP(0)', allowNull: false })
  inserted_at: Date;
}
