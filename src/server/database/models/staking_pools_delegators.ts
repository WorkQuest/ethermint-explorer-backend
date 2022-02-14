import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class staking_pools_delegators extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  address_hash: any;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_deleted: boolean;

  @Column({ type: DataType.DECIMAL(100) })
  max_ordered_withdraw_allowed: string;

  @Column({ type: DataType.DECIMAL(100) })
  max_withdraw_allowed: string;

  @Column({ type: DataType.DECIMAL(100) })
  ordered_withdraw: string;

  @Column({ type: DataType.INTEGER })
  ordered_withdraw_epoch: number;

  @Column({ type: DataType.DECIMAL(5, 2) })
  reward_ratio: string;

  @Column({ type: DataType.DECIMAL(5, 2) })
  snapshotted_reward_ratio: string;

  @Column({ type: DataType.DECIMAL(100) })
  snapshotted_stake_amount: string;

  @Column({ type: DataType.DECIMAL(100) })
  stake_amount: string;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('staking_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  staking_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
