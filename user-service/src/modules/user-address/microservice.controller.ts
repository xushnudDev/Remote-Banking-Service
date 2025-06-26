import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAddressDto, UpdateAddressDto } from './dtos';
import { AddressService } from './address.service';

@Controller()
export class UserAddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('create_user_address')
  create(@Payload() userId: number,dto: CreateAddressDto) {
    return this.addressService.create(userId,dto);
  }

  @MessagePattern('get_all_user_addresses')
  findAll() {
    return this.addressService.findAll();
  }

  @MessagePattern('get_user_address_by_id')
  findOne(@Payload() id: number) {
    return this.addressService.findOne(id);
  }

  @MessagePattern('update_user_address')
  update(@Payload() payload: { id: number; data: UpdateAddressDto }) {
    return this.addressService.updateUserAddress(payload.id, payload.data);
  }

  @MessagePattern('delete_user_address')
  remove(@Payload() id: number) {
    return this.addressService.deleteUserAddress(id);
  }
}
