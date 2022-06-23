import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Address } from './Address';

@Table({ tableName: 'address_names' })
export class AddressName extends Model {
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
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  primary: boolean;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.JSONB })
  metadata: object;
}
