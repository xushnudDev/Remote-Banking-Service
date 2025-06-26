import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCompanyService } from './user-company.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserCompanyDto, UpdateUserCompanyDto } from './dtos';

@ApiTags('User Company')
@Controller('users/:userId/companies')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create user-company' })
  @ApiResponse({ status: 201, description: 'UserCompany created' })
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateUserCompanyDto,
  ) {
    return await this.userCompanyService.createUserCompany(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies by userId' })
  @ApiResponse({ status: 200, description: 'User companies' })
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userCompanyService.findByUserId(userId);
  }

  @Put(':companyId')
  @ApiOperation({ summary: 'Update user company' })
  @ApiResponse({ status: 200, description: 'User company updated' })
  async update(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() dto: UpdateUserCompanyDto,
  ) {
    return await this.userCompanyService.update(companyId, dto);
  }

  @Delete(':companyId')
  @ApiOperation({ summary: 'Delete user company by ID' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  async delete(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return await this.userCompanyService.delete(companyId);
  }
}
