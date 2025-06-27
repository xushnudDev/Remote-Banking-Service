import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from './dtos';

@ApiTags('User Address')
@Controller('users/:userId/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create address for user' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: CreateAddressDto,
  ) {
    return await this.addressService.create(userId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get address by user ID' })
  @ApiResponse({ status: 200, description: 'Address fetched successfully' })
  async getByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.addressService.findOne(userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update address by user ID' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateAddressDto,
  ) {
    return await this.addressService.updateUserAddress(userId, data);
  }

  @Patch()
  @ApiOperation({ summary: 'Update address by user ID' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  async updateAddress(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdateAddressDto,
  ) {
    return await this.addressService.updateUserAddress(userId, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete address by user ID' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully' })
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return await this.addressService.deleteUserAddress(userId);
  }
}
