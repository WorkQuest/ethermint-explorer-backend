import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Address } from './Address';
import { AddressCurrentTokenBalance } from './AddressCurrentTokenBalance';
import { AddressTokenBalance } from './AddressTokenBalance';
import { TokenMetaData } from './TokenMetaData';

@Table({ tableName: 'tokens' })
export class Token extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  symbol: string;

  @Column({ type: DataType.DECIMAL })
  total_supply: string;

  @Column({ type: DataType.DECIMAL })
  decimals: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  contract_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.INTEGER })
  holder_count: number;

  @Column({ type: DataType.BOOLEAN })
  bridged: boolean;

  @Column({ type: DataType.BOOLEAN })
  skip_metadata: boolean;

  @BelongsTo(() => Address) contractAddress: Address;

  @HasOne(() => TokenMetaData) metadata: TokenMetaData;

  @HasMany(() => AddressTokenBalance) tokenBalances: AddressTokenBalance[];
  @HasMany(() => AddressCurrentTokenBalance) currentTokenBalances: AddressCurrentTokenBalance[];
}
