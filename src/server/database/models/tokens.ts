import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';

@Table
export class tokens extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  symbol: string;

  @Column({ type: DataType.DECIMAL })
  total_supply: string;

  @Column({ type: DataType.DECIMAL })
  decimals: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true, onDelete: 'cascade' })
  contract_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.INTEGER })
  holder_count: number;

  @Column({ type: DataType.BOOLEAN })
  bridged: boolean;

  @Column({ type: DataType.BOOLEAN })
  skip_metadata: boolean;
}
