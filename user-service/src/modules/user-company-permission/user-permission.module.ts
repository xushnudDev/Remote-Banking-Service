import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCompanyPermission } from "./entity";
import { UserPermissionService } from "./user-permission.service";
import { UserPermissionController } from "./user-permission.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserCompanyPermission])],
    providers: [UserPermissionService],
    controllers: [UserPermissionController],
})
export class UserPermissionModule {}