import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddressService } from "./address.service";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateAddressDto, UpdateAddressDto } from "./dtos";

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user address' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  async create(@Body() addressDto: CreateAddressDto) {
    return await this.addressService.create(addressDto);
  };

  @Get()
  @ApiOperation({ summary: 'Get all user addresses' })
  @ApiResponse({ status: 200, description: 'Addresses fetched successfully' })
  async getAll() {
    return await this.addressService.findAll();
  };

  @Get('user/:id')
  @ApiOperation({ summary: 'Get user addresses by user ID' })
  @ApiResponse({ status: 200, description: 'Addresses fetched successfully' })
  async getByUserId(@Param('id',ParseIntPipe) id: number) {
    return await this.addressService.findOne(id);
  };

  @Put(':id')
  @ApiOperation({ summary: 'Update a user address by ID' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateDto: UpdateAddressDto) {
    return await this.addressService.updateUserAddress(id, updateDto);
  };

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user address by ID' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully' })
  async delete(@Param('id',ParseIntPipe) id: number) {
    return await this.addressService.deleteUserAddress(id);
  };
}