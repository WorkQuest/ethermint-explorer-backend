import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';

@Table
export class address_coin_balances_daily extends Model {
  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB, allowNull: false })
  address_hash: any;

  @Column({ type: DataType.DATE, allowNull: false })
  day: Date;

  @Column({ type: DataType.DECIMAL(100), defaultValue: null })
  value: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
