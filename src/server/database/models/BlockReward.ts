import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Address } from './Address';
import { Block } from './Block';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';

@Table({ tableName: 'block_rewards' })
export class BlockReward extends Model {
  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedAddress = this.getDataValue('address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  address_hash: any;

  @Column({ type: DataType.STRING, allowNull: false })
  address_type: string;

  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedHash = this.getDataValue('block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  block_hash: any;

  @Column({ type: DataType.DECIMAL(100) })
  reward: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
