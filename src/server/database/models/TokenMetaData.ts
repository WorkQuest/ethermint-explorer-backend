import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Token } from './Token';

@Table({ tableName: 'token_metadata' })
export class TokenMetaData extends Model {
  @ForeignKey(() => Token)
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

  @Column({ type: DataType.STRING }) iconUrl: string;
  @Column({ type: DataType.TEXT }) description: string;
}
