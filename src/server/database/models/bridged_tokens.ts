import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { tokens } from './tokens';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class bridged_tokens extends Model {
  @Column({ type: DataType.DECIMAL, allowNull: false })
  foreign_chain_id: string;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    get() {
      const bufferedAddress = this.getDataValue('foreign_token_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  foreign_token_contract_address_hash: any;

  @ForeignKey(() => tokens)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('home_token_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  home_token_contract_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.STRING })
  custom_metadata: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.DECIMAL })
  exchange_rate: string;

  @Column({ type: DataType.BOOLEAN })
  lp_token: boolean;

  @Column({ type: DataType.DECIMAL })
  custom_cap: string;
}
