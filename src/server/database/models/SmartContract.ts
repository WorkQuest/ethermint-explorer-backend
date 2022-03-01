import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { parseBufferedAddress } from '../../utils/address';
import { Address } from './Address';

@Table({ tableName: 'smart_contracts' })
export class SmartContract extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  compiler_version: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  optimization: boolean;

  @Column({ type: DataType.TEXT, allowNull: false })
  contract_source_code: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  abi: object;

  @ForeignKey(() => Address)
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

  @Column({ type: DataType.TEXT })
  constructor_arguments: string;

  @Column({ type: DataType.INTEGER })
  optimization_runs: number;

  @Column({ type: DataType.STRING })
  evm_version: string;

  @Column({ type: DataType.ARRAY(DataType.JSONB), defaultValue: [] })
  external_libraries: object[];

  @Column({ type: DataType.BOOLEAN })
  verified_via_sourcify: boolean;

  @Column({ type: DataType.BOOLEAN })
  partially_verified: boolean;


  @Column({ type: DataType.TEXT })
  file_path: string;
}
