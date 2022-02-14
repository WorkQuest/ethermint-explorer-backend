import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { tokens } from './tokens';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class address_current_token_balances extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @ForeignKey(() => addresses)
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

  @ForeignKey(() => tokens)
  @Column({ type: DataType.BLOB, allowNull: false })
  token_contract_address_hash: any;

  @Column({ type: DataType.DECIMAL, defaultValue: null })
  value: string;

  @Column({ type: 'TIMESTAMP' })
  value_fetched_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.DECIMAL })
  old_value: string;
}
