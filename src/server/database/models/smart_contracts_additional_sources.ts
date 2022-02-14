import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { smart_contracts } from './smart_contracts';

@Table
export class smart_contracts_additional_sources extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  file_path: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  contract_source_code: string;

  @ForeignKey(() => smart_contracts)
  @Column({ type: DataType.BLOB, allowNull: false, onDelete: 'cascade' })
  address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
