import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';
import { Transaction } from './Transaction';
import { Address } from './Address';
import { Block } from './Block';

@Table({ tableName: 'token_transfers' })
export class TokenTransfer extends Model {
  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('transaction_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  transaction_hash: string;

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  log_index: number;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('from_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  from_address_hash: any;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('to_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  to_address_hash: any;

  @Column({ type: DataType.DECIMAL })
  amount: string;

  @Column({ type: DataType.DECIMAL(78) })
  token_id: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedAddress = this.getDataValue('token_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  token_contract_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('block_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  block_hash: any;
}
