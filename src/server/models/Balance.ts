import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Token } from './Token';
import { Account } from './Account';
import { literal, Transaction } from 'sequelize';

@Table
export class Balance extends Model {
  @Column({type: DataType.STRING, defaultValue: getUUID, primaryKey: true}) id: string;

  @Column({type: DataType.DECIMAL, defaultValue: '0'}) amount: string;

  @ForeignKey(() => Token)
  @Column(DataType.STRING) tokenId: string;

  @ForeignKey(() => Account)
  @Column(DataType.STRING) accountAddress: string;

  @BelongsTo(() => Token) token: Token;
  @BelongsTo(() => Account) account: Account;

  static async getBalance(address: string, token: string): Promise<Balance | null> {
    return await Balance.findOne({
      where: {
        tokenId: token,
        accountAddress: address
      }
    });
  }

  static async incrementBalance(amount: string, address: string, token: string, transaction?: Transaction) {
    if (! await Balance.getBalance(address, token)){
      await Balance.create({
        amount: amount,
        accountAddress: address,
        tokenId: token
      }, {transaction})
    } else {
      await Balance.update({
        amount: literal('amount + ' + amount)
      }, {
        where: {
          accountAddress: address,
          tokenId: token
        },
        transaction
      });
    }

  }
  static async decrementBalance(amount: string, address: string, token: string, transaction?: Transaction) {
    await Balance.update({
      amount: literal('amount - ' + amount)
    }, {
      where: {
        accountAddress: address,
        tokenId: token
      },
      transaction
    });
  }
}
