import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { tokens } from './tokens';

@Table
export class address_token_balances extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB, allowNull: false })
  address_hash: any;

  @Column({ type: DataType.BIGINT, allowNull: false })
  block_number: string;

  @ForeignKey(() => tokens)
  @Column({ type: DataType.BLOB, allowNull: false })
  token_contract_address_hash: any;

  @Column({ type: DataType.DECIMAL, defaultValue: null })
  value: string;

  @Column({ type: 'TIMESTAMP' })
  value_fetched_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
