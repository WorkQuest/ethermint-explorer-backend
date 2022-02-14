import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class transaction_stats extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.INTEGER })
  number_of_transactions: number;

  @Column({ type: DataType.DECIMAL(100) })
  gas_user: string;

  @Column({ type: DataType.DECIMAL(100) })
  total_fee: string;
}
