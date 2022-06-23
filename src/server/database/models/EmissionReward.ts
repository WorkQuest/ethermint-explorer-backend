import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'emission_rewards' })
export class EmissionReward extends Model {
  @Column({ type: DataType.RANGE(DataType.BIGINT) })
  block_range: any;

  @Column({ type: DataType.DECIMAL })
  reward: string;
}
