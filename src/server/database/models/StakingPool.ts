import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';

@Table({ tableName: 'staking_pools' })
export class StakingPool extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  are_delegators_banned: boolean;

  @Column({ type: DataType.BIGINT })
  banned_delegators_until: string;

  @Column({ type: DataType.BIGINT })
  banned_until: string;

  @Column({ type: DataType.STRING })
  ban_reason: string;

  @Column({ type: DataType.INTEGER })
  delegators_count: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_banned: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_deleted: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_unremovable: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_validator: boolean;

  @Column({ type: DataType.DECIMAL(5, 2) })
  likelihood: string;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('mining_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  mining_address_hash: any;

  @Column({ type: DataType.DECIMAL(100) })
  self_staked_amount: string;

  @Column({ type: DataType.DECIMAL(100) })
  snapshotted_self_staked_amount: string;

  @Column({ type: DataType.DECIMAL(100) })
  snapshotted_total_staked_amount: string;

  @Column({ type: DataType.DECIMAL(5, 2) })
  snapshotted_validator_reward_ratio: string;

  @Column({ type: DataType.DECIMAL(5, 2) })
  stakes_ratio: string;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('staking_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  staking_address_hash: any;

  @Column({ type: DataType.DECIMAL(100) })
  total_staked_amount: string;

  @Column({ type: DataType.DECIMAL(5, 2) })
  validator_reward_percent: string;

  @Column({ type: DataType.DECIMAL(5, 2) })
  validator_reward_ratio: string;

  @Column({ type: DataType.INTEGER })
  was_banned_count: number;

  @Column({ type: DataType.INTEGER })
  was_validator_count: number;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.STRING(256) })
  name: string;

  @Column({ type: DataType.STRING(1024) })
  description: string;
}
