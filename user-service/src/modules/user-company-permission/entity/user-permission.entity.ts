import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserCompany } from 'src/modules/user-company/entity/user-company.entity';

@Entity('user_company_permission')
export class UserCompanyPermission {
  @PrimaryColumn()
  user_company_id: number;

  @PrimaryColumn()
  permission_id: number;

  @ManyToOne(() => UserCompany, userCompany => userCompany.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_company_id' })
  userCompany: UserCompany;
}
