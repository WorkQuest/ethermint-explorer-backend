import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress, parseBufferedHash } from '../../utils/address';
import { tokens } from './tokens';
import { smart_contracts } from './smart_contracts';

@Table
export class addresses extends Model {
  @Column({ type: DataType.DECIMAL(100) })
  fetched_coin_balance: string;

  @Column({ type: DataType.BIGINT })
  fetched_coin_balance_block_number: string;

  @Column({
    type: DataType.BLOB,
    primaryKey: true,
    allowNull: false,
    get() {
      const bufferedAddress = this.getDataValue('hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  hash: any;

  @Column({
    type: DataType.BLOB,
    get() {
      const bufferedHash = this.getDataValue('contract_code');

      return parseBufferedHash(bufferedHash);
    },
  })
  contract_code: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.INTEGER })
  nonce: number;

  @Column({ type: DataType.BOOLEAN })
  decompiled: boolean;

  @Column({ type: DataType.BOOLEAN })
  verified: boolean;

  @HasOne(() => tokens) addressToken: tokens;
  @HasOne(() => smart_contracts) addressContract: smart_contracts;
}
