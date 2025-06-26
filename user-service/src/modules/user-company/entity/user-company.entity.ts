import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { UserCompanyPermission } from 'src/modules/user-company-permission/entity/user-permission.entity';

@Entity('user_company')
export class UserCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column()
  role_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.companies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UserCompanyPermission, permission => permission.userCompany, {
    cascade: true,
  })
  permissions: UserCompanyPermission[];
}
