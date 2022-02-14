import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { addresses } from './addresses';
import { transactions } from './transactions';
import { blocks } from './blocks';
import { parseBufferedAddress } from '../../utils/address';

@Table
export class logs extends Model {
  @Column({ type: DataType.BLOB, allowNull: false })
  data: any;

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  index: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  first_topic: string;

  @Column({ type: DataType.STRING })
  second_topic: string;

  @Column({ type: DataType.STRING })
  third_topic: string;

  @Column({ type: DataType.STRING })
  fourth_topic: string;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @ForeignKey(() => addresses)
  @Column({
    type: DataType.BLOB,
    onDelete: 'cascade',
    get() {
      const bufferedAddress = this.getDataValue('address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  address_hash: any;

  @ForeignKey(() => transactions)
  @Column({ type: DataType.BLOB, allowNull: false, onDelete: 'cascade', primaryKey: true })
  transaction_hash: string;

  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  block_hash: any;

  @Column({ type: DataType.INTEGER })
  block_number: number;
}
