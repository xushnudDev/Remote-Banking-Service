import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('company_address')
export class CompanyAddress {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'region_id', type: 'bigint', nullable: false })
  regionId: number;

  @Column({ name: 'district_id', type: 'bigint', nullable: false })
  districtId: number;

  @Column({ name: 'company_id', type: 'bigint', nullable: false })
  companyId: number;

  @OneToOne(() => Company, (company) => company.address)
  @JoinColumn({ name: 'company_id' })
  company: Company;

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
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
