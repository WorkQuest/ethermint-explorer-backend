import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Block } from './Block';
import { Account } from './Account';
import { Token } from './Token';

@Table
export class Tx extends Model {
  @Column({type: DataType.STRING, primaryKey: true}) id: string

  @ForeignKey(() => Block)
  @Column(DataType.INTEGER) blockNumber: number;

  @Column(DataType.DATE) timestamp: string;

  @ForeignKey(() => Account)
  @Column(DataType.STRING) fromAddress: string

  @ForeignKey(() => Account)
  @Column(DataType.STRING) toAddress: string

  @Column(DataType.DECIMAL) gasUsed: string;
  @Column(DataType.DECIMAL) gasPrice: string;
  @Column(DataType.DECIMAL) gasLimit: string;
  @Column(DataType.DECIMAL) value: string;
  @Column(DataType.INTEGER) status: number;

  @ForeignKey(() => Account)
  @Column({type: DataType.STRING, defaultValue: null}) contractAddress: string;

  @ForeignKey(() => Token)
  @Column({type: DataType.STRING, defaultValue: null}) tokenId: string;

  @Column({type: DataType.JSONB, defaultValue: []}) logs: object;
  @Column({type: DataType.TEXT, defaultValue: '0x'}) input: string;

  @BelongsTo(() => Block) block: Block;
  @BelongsTo(() => Account, 'fromAddress') from: Account
  @BelongsTo(() => Account, 'toAddress') to: Account
  @BelongsTo(() => Account, 'contractAddress') contract: Account
  @BelongsTo(() => Token) token: Token
}
