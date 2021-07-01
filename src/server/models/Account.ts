import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany, HasOne,
  Model,
  Table
} from 'sequelize-typescript';
import { Tx } from './Tx';
import { Balance } from './Balance';
import { hex2bech } from '../../indexer/utils';
import { Token } from './Token';

export enum AccountType {
  Contract = 'contract',
  Address = 'address',
}

@Table
export class Account extends Model {
  @Column({type: DataType.STRING, primaryKey: true}) id: string;

  @Column(DataType.STRING) bech32Address: string;

  @Column(DataType.INTEGER) txsCount: number;

  @Column(DataType.STRING) type: AccountType

  @ForeignKey(() => Tx)
  @Column({type: DataType.STRING, defaultValue: null}) creatorTxId: string;

  @ForeignKey(() => Account)
  @Column({type: DataType.STRING, defaultValue: null}) creatorId: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false}) isERC20: boolean;


  @HasMany(() => Balance) balances: Balance[];
  @HasMany(() => Tx) txs: Tx[];
  @BelongsTo(() => Tx, {constraints: false}) creatorTx: Tx;
  @BelongsTo(() => Account, {constraints: false}) creator: Account;
  @HasOne(() => Token, 'contractAddress') token: Token;

  static async createIfNotExist(address: string){
    await Account.findOrCreate({
      where: {
        id: address
      },
      defaults: {
        bech32Address: hex2bech(address),
        txsCount: 0,
        type: AccountType.Address
      }
    })
  }

  static async createContractAccount(address: string, from: string, tx: string): Promise<[Account, boolean]>{
    return await Account.findOrCreate({
      where: {
        id: address
      },
      defaults: {
        creatorId: from,
        creatorTxId: tx,
        type: AccountType.Contract,
        txsCount: 0
      }
    })
  }
}
