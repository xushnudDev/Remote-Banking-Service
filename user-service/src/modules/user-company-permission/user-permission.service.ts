import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCompanyPermission } from './entity';
import { Repository } from 'typeorm';
import { CreateUserCompanyPermissionDto } from './dtos';
import { BaseResponse } from 'src/common';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserCompanyPermission)
    private readonly userPermissionRepository: Repository<UserCompanyPermission>,
  ) {}

  async createPermission(
    dto: CreateUserCompanyPermissionDto,
  ): Promise<BaseResponse<UserCompanyPermission>> {
    const permission = this.userPermissionRepository.create(dto);
    if (!permission) {
      return {
        success: false,
        data: null,
        error: {
          code: 500,
          message: 'Internal server error',
          cause: 'Failed to create permission',
          fields: [],
        },
      };
    }
    const savedPermission =
      await this.userPermissionRepository.save(permission);
    return {
      success: true,
      data: savedPermission,
      error: null,
    };
  }

  async deletePermission(
    user_company_id: number,
    permission_id: number,
  ): Promise<BaseResponse<null>> {
    const permission = await this.userPermissionRepository.findOne({
      where: {
        user_company_id,
        permission_id,
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
          fields: [
            { name: 'user_company_id', message: 'Provided ID not found in database' },
            { name: 'permission_id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    await this.userPermissionRepository.delete(permission);
    return {
      success: true,
      data: null,
      error: null,
    };
  }
}
