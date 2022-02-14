import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class decompiled_smart_contracts extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  decompiler_version: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  decompiled_source_code: string;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;
}
