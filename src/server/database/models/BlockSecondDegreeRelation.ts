import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Block } from './Block';
import { parseBufferedHash } from '../../utils/address';

@Table({ tableName: 'block_second_degree_relations' })
export class BlockSecondDegreeRelation extends Model {
  @ForeignKey(() => Block)
  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('nephew_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  nephew_hash: any;

  @Column({
    type: DataType.BLOB,
    allowNull: false,
    primaryKey: true,
    get() {
      const bufferedHash = this.getDataValue('uncle_hash');

      return parseBufferedHash(bufferedHash);
    },
  })
  uncle_hash: any;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  uncle_fetched_at: Date;

  @Column({ type: DataType.INTEGER })
  index: number;
}
