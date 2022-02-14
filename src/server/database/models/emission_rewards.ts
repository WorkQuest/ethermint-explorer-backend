import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class emission_rewards extends Model {
  @Column({ type: DataType.RANGE(DataType.BIGINT) })
  block_range: any;

  @Column({ type: DataType.DECIMAL })
  reward: string;
}
