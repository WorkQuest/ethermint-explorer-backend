import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class address_names extends Model {
  @Column({ type: DataType.BLOB, allowNull: false })
  address_hash: any;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  primary: boolean;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  inserted_at: Date;

  @Column({ type: 'TIMESTAMP', allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.JSONB })
  metadata: object;
}
