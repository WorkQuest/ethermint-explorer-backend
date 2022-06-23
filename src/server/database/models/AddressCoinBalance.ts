import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Address } from './Address';

@Table({ tableName: 'address_coin_balances' })
export class AddressCoinBalance extends Model {
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

  @Column({ type: DataType.BIGINT, allowNull: false })
  block_number: string;

  @Column({ type: DataType.DECIMAL(100), defaultValue: null })
  value: string;

  @Column({ type: 'TIMESTAMP' })
  value_fetched_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @BelongsTo(() => Address) address: Address;
}
