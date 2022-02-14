import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { transactions } from './transactions';
import { addresses } from './addresses';
import { blocks } from './blocks';

@Table
export class token_transfers extends Model {
  @ForeignKey(() => transactions)
  @Column({ type: DataType.BLOB, allowNull: false, onDelete: 'cascade', primaryKey: true })
  transaction_hash: string;

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  log_index: number;

  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB })
  from_address_hash: any;

  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB })
  to_address_hash: any;

  @Column({ type: DataType.DECIMAL })
  amount: string;

  @Column({ type: DataType.DECIMAL(78) })
  token_id: string;

  @ForeignKey(() => addresses)
  @Column({ type: DataType.BLOB })
  token_contract_address_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.INTEGER })
  block_number: number;

  @ForeignKey(() => blocks)
  @Column({ type: DataType.BLOB, allowNull: false, primaryKey: true })
  block_hash: any;
}
