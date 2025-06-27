import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCompanyPermission } from './entity/user-permission.entity';
import { Repository } from 'typeorm';
import { CreateUserCompanyPermissionDto } from './dtos';
import { BaseResponse } from 'src/common';
import { UserCompany } from '../user-company/entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserCompanyPermission)
    private readonly userPermissionRepository: Repository<UserCompanyPermission>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
  ) {}

  async getUserCompanyId(
    userId: number,
    companyId: number,
  ): Promise<number | null> {
    const userCompany = await this.userCompanyRepository.findOne({
      where: {
        user: { id: userId },
        company_id: companyId,
      },
    });
    return userCompany?.id || null;
  }

  async createPermission(
    userId: number,
    companyId: number,
    dto: CreateUserCompanyPermissionDto,
  ): Promise<BaseResponse<UserCompanyPermission>> {
    const userCompanyId = await this.getUserCompanyId(userId, companyId);

    if (!userCompanyId) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'UserCompany not found',
          cause: 'Entity not found',
        },
      };
    }

    const permission = this.userPermissionRepository.create({
      user_company_id: userCompanyId,
      permission_id: dto.permission_id,
    });

    const saved = await this.userPermissionRepository.save(permission);
    return { success: true, data: saved, error: null };
  }

  async deletePermission(
    userId: number,
    companyId: number,
    permissionId: number,
  ): Promise<BaseResponse<null>> {
    const userCompanyId = await this.getUserCompanyId(userId, companyId);

    if (!userCompanyId) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'UserCompany not found',
          cause: 'Entity not found',
        },
      };
    }

    const permission = await this.userPermissionRepository.findOne({
      where: {
        user_company_id: userCompanyId,
        permission_id: permissionId,
      },
    });

    if (!permission) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Permission not found',
          cause: 'Entity not found',
        },
      };
    }

    await this.userPermissionRepository.delete(permission.permission_id);
    return { success: true, data: null, error: null };
  }
}
