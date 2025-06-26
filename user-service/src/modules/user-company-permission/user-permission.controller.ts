import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from './user-permission.service';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserCompanyPermissionDto } from './dtos';

@ApiTags('User Company Permission')
@Controller('user-company-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Post()
  @ApiProperty({ description: 'Create a new permission for a user company' })
  @ApiResponse({ status: 201, description: 'Permission created successfully' })
  async createPermission(@Body() data: CreateUserCompanyPermissionDto) {
    return await this.userPermissionService.createPermission(data);
  }

  @Delete(':user_company_id/:permission_id')
  @ApiProperty({ description: 'Delete a permission for a user company' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  async deletePermission(
    @Param('user_company_id') user_company_id: number,
    @Param('permission_id') permission_id: number,
  ) {
    return await this.userPermissionService.deletePermission(
      user_company_id,
      permission_id,
    );
  }
}
