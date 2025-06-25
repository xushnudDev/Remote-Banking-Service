import { UserCompany } from "src/modules/user-company/entity/user-company.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('user_company_permission')
export class UserCompanyPermission {
    @PrimaryColumn()
    user_company_id: number;

    @PrimaryColumn()
    permission_id: number;

    @ManyToOne(() => UserCompany, (userCompany) => userCompany.permissions,{onDelete: 'CASCADE'})
    userCompany: UserCompany;
}