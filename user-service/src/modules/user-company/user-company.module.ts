import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCompany } from "./entity";
import { User } from "../user/entity";
import { UserCompanyPermission } from "../user-company-permission";
import { UserCompanyController } from "./user-company.controller";
import { UserCompanyService } from "./user-company.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserCompany,User,UserCompanyPermission])],
    controllers: [UserCompanyController],
    providers: [UserCompanyService],
})
export class UserCompanyModule {}