import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Account } from './Account';

@Table
export class Token extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  }) id: string;

  @Column(DataType.STRING) name: string;
  @Column(DataType.STRING) symbol: string;

  @Column(DataType.INTEGER) decimals: number;
  @Column({ type: DataType.DECIMAL, defaultValue: null }) totalSupply: string;

  @ForeignKey( () => Account)
  @Column({type: DataType.STRING, defaultValue: null}) contractAddress: string;

  @BelongsTo(() => Account) contract: Account;
}
