import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tokens } from './tokens';

@Table
export class token_instances extends Model {
  @Column({ type: DataType.DECIMAL(78), allowNull: false, primaryKey: true })
  token_id: string;

  @ForeignKey(() => tokens)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  token_contract_address_hash: any;

  @Column({ type: DataType.JSONB })
  metadata: object;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.STRING })
  error: string;
}