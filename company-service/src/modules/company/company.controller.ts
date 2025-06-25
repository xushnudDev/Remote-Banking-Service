import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import {
  CreateAddressDto,
  CreateCompanyDto,
  UpdateAddressDto,
  UpdateCompanyDto,
} from './dtos';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  async createCompany(@Body() data: CreateCompanyDto) {
    return await this.companyService.createCompany(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies with pagination' })
  @ApiResponse({ status: 200, description: 'Companies fetched successfully' })
  async getAllCompanies(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ) {
    return await this.companyService.findAll(page, size);
  }
  @Get('/addresses')
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({ status: 200, description: 'Addresses fetched successfully' })
  async getAllAddresses() {
    return await this.companyService.findAllAddresses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Company fetched successfully' })
  async getCompanyById(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  async updateOneCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCompanyDto,
  ) {
    return await this.companyService.updateCompany(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one company' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  async deleteOneCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.deleteCompany(id);
  }

  @Post('/:companyId/address')
  @ApiOperation({ summary: 'Create address for company' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  async createAddress(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() data: CreateAddressDto,
  ) {
    data.companyId = companyId;
    return await this.companyService.createAddress(data);
  }

  @Get('/:companyId/address')
  @ApiOperation({ summary: 'Get address by companyId' })
  @ApiResponse({ status: 200, description: 'Address fetched successfully' })
  async getAddressByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return await this.companyService.findOneAddress(companyId);
  }

  @Put('/:companyId/address')
  @ApiOperation({ summary: 'Update address by companyId' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  async updateAddress(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() data: UpdateAddressDto,
  ) {
    return await this.companyService.updateAddress(companyId, data);
  }

  @Delete('/:companyId/address')
  @ApiOperation({ summary: 'Delete address by companyId' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully' })
  async deleteAddress(@Param('companyId', ParseIntPipe) companyId: number) {
    return await this.companyService.deleteAddress(companyId);
  }
}
