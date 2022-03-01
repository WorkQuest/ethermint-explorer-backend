import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Token } from './Token';

@Table({ tableName: 'token_instances' })
export class TokenInstance extends Model {
  @Column({ type: DataType.DECIMAL(78), allowNull: false, primaryKey: true })
  token_id: string;

  @ForeignKey(() => Token)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedAddress = this.getDataValue('token_contract_address_hash');

      return parseBufferedAddress(bufferedAddress);
    },
  })
  token_contract_address_hash: any;

  @Column({ type: DataType.JSONB })
  metadata: object;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.STRING })
  error: string;
}
