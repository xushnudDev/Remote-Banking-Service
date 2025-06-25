import { UserCompanyPermission } from "src/modules/user-company-permission/entity/user-permission.entity";
import { User } from "src/modules/user/entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_company')
export class UserCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    role_id: number;

    @ManyToOne(() => User, (user) => user.companies,{onDelete: 'CASCADE'})
    user: User;

    @OneToMany(() => UserCompanyPermission, (permission) => permission.userCompany,{cascade: true})
    permissions: UserCompanyPermission[];
}
