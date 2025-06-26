import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity';
import { CreateAddressDto } from './dtos';
import { BaseResponse } from 'src/common';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(addressDto: CreateAddressDto): Promise<BaseResponse<UserAddress>> {
  const user = await this.userRepository.findOne({
    where: { id: addressDto.user_id },
    relations: ['address'],
  });

  if (!user) {
    return {
      success: false,
      data: null,
      error: {
        code: 404,
        message: 'User not found',
        cause: 'Entity not found',
        fields: [
          { name: 'user_id', message: 'Provided user ID not found in database' },
        ],
      },
    };
  }

  const address = this.addressRepository.create({
    region_id: addressDto.region_id,
    district_id: addressDto.district_id,
    address: addressDto.address,
    user,
  });

  const savedAddress = await this.addressRepository.save(address);

  user.address = savedAddress;
  await this.userRepository.save(user);

  return {
    success: true,
    data: savedAddress,
    error: null,
  };
}


  async findAll(): Promise<BaseResponse<UserAddress[]>> {
    const addresses = await this.addressRepository.find({
        relations: ['user']
    });
    if (!addresses) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Addresses not found',
          cause: 'Entity not found',
          fields: [],
        },
      };
    }
    return {
      success: true,
      data: addresses,
      error: null,
    };
  };

  async findOne(id: number): Promise<BaseResponse<UserAddress>> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Address not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    return {
      success: true,
      data: address,
      error: null,
    };
  };

  async updateUserAddress(id: number, addressDto: CreateAddressDto): Promise<BaseResponse<UserAddress>> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Address not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    const updatedAddress = await this.addressRepository.save({
      ...address,
      ...addressDto,
    });
    return {
      success: true,
      data: updatedAddress,
      error: null,
    };
  };

  async deleteUserAddress(id: number): Promise<BaseResponse<null>> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Address not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    await this.addressRepository.delete(id);
    return {
      success: true,
      data: null,
      error: null,
    };
  }
}
