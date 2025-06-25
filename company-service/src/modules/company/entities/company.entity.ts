import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyAddress } from './address.entity';

export enum CompanyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'char', length: 9, nullable: false })
  tin: string;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    enumName: 'company_status_enum',
    default: CompanyStatus.ACTIVE,
  })
  status: CompanyStatus;

  @OneToOne(() => CompanyAddress, (address) => address.company)
  address: CompanyAddress;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
