import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class addresses extends Model {
  @Column({ type: DataType.DECIMAL(100) })
  fetched_coin_balance: string;

  @Column({ type: DataType.BIGINT })
  fetched_coin_balance_block_number: string;

  @Column({ type: DataType.BLOB, primaryKey: true, allowNull: false })
  hash: any;

  @Column({ type: DataType.BLOB })
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
}
