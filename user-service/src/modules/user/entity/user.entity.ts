import { UserAddress } from 'src/modules/user-address/entity';
import { UserCompany } from 'src/modules/user-company/entity/user-company.entity';
import { UserContact } from 'src/modules/user-contact/entity/contact.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserStatus {
  NEW = 'new',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  patronym: string;

  @Column({ length: 14 })
  pin: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    enumName: 'user_status_enum',
    default: UserStatus.NEW,
  })
  status: UserStatus;

  @OneToOne(() => UserAddress, (address) => address.user, { onDelete: 'CASCADE',nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: UserAddress;

  @OneToMany(() => UserContact, (contact) => contact.user, { onDelete: 'CASCADE', nullable: true })
  contacts: UserContact[];

  @OneToMany(() => UserCompany, (company) => company.user, { onDelete: 'CASCADE', nullable: true })
  companies: UserCompany[];

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
