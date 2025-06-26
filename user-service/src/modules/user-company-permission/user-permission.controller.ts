import { ApiOperation,ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from './user-permission.service';
import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserCompanyPermissionDto } from './dtos';

@ApiTags('User Company Permission')
@Controller('users/:userId/companies/:companyId/permissions')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a permission for a user-company' })
  @ApiResponse({ status: 201, description: 'Permission created successfully' })
  async createPermission(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() data: CreateUserCompanyPermissionDto,
  ) {
    return await this.userPermissionService.createPermission(userId, companyId, data);
  }

  @Delete(':permissionId')
  @ApiOperation({ summary: 'Delete a permission for a user-company' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  async deletePermission(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ) {
    return await this.userPermissionService.deletePermission(userId, companyId, permissionId);
  }
}
