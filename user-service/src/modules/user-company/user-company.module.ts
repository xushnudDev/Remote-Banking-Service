import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompany } from './entity';
import { User } from '../user/entity';
import { UserPermissionModule } from '../user-company-permission/user-permission.module';
import { UserCompanyController } from './user-company.controller';
import { UserCompanyService } from './user-company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompany, User]),
    forwardRef(() => UserPermissionModule),
  ],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
  exports: [UserCompanyService],
})
export class UserCompanyModule {}
