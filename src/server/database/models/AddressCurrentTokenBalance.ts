import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Address } from './Address';
import { Token } from './Token';

@Table({ tableName: 'address_current_token_balances' })
export class AddressCurrentTokenBalance extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

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

  @ForeignKey(() => Token)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedAddress = this.getDataValue('token_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
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

  @BelongsTo(() => Token) token: Token;
  @BelongsTo(() => Address) address: Address;
}
