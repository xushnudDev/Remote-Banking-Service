import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompanyPermission } from './entity/user-permission.entity'; 
import { UserCompany } from '../user-company/entity/user-company.entity';
import { UserCompanyModule } from '../user-company/user-company.module';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompanyPermission, UserCompany]),
    forwardRef(() => UserCompanyModule),
  ],
  providers: [UserPermissionService],
  controllers: [UserPermissionController],
  exports: [UserPermissionService],
})
export class UserPermissionModule {}
