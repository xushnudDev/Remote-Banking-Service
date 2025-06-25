import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCompanyService } from './user-company.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserCompanyDto } from './dtos';

@ApiTags('User Company')
@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new user company',
  })
  @ApiResponse({
    status: 201,
    description: 'User company created',})
    async createUserCompany(@Body() data: CreateUserCompanyDto) {
    return await this.userCompanyService.createUserCompany(data);
  };

  @Get()
  @ApiOperation({
    summary: 'Get all user companies',
  })
  @ApiResponse({
    status: 200,
    description: 'User companies found',
  })
  async getUserCompanies() {
    return await this.userCompanyService.findAll();
  };

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user company',
  })
  @ApiResponse({
    status: 200,
    description: 'delete user company',
  })
  async deleteUserCompany(@Param('id',ParseIntPipe) id: number) {
    return await this.userCompanyService.delete(id);
  }
}
