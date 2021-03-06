import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'last_fetched_counters' })
export class LastFetchedCounter extends Model {
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
  counter_type: string;

  @Column({ type: DataType.DECIMAL(100) })
  value: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
