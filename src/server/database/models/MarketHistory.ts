import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'market_history' })
export class MarketHistory extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.DECIMAL })
  closing_price: string;

  @Column({ type: DataType.DECIMAL })
  opening_price: string;
}
