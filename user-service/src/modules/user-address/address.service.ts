import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity';
import { CreateAddressDto, UpdateAddressDto } from './dtos';
import { BaseResponse } from 'src/common';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly addressRepository: Repository<UserAddress>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    addressDto: CreateAddressDto,
  ): Promise<BaseResponse<UserAddress>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
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
            {
              name: 'user_id',
              message: 'Provided user ID not found in database',
            },
          ],
        },
      };
    }

    const address = this.addressRepository.create({
      region_id: addressDto.region_id,
      district_id: addressDto.district_id,
      address: addressDto.address,
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
      relations: ['user'],
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
  }

  async findOne(userId: number): Promise<BaseResponse<UserAddress>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['address'],
    });

    if (!user || !user.address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User or address not found',
          cause: 'Entity not found',
          fields: [
            { name: 'userId', message: 'Address not found for this user' },
          ],
        },
      };
    }

    return {
      success: true,
      data: user.address,
      error: null,
    };
  }

  async updateUserAddress(
    userId: number,
    addressDto: UpdateAddressDto,
  ): Promise<BaseResponse<UserAddress>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['address'],
    });

    if (!user || !user.address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User or address not found',
          cause: 'Entity not found',
          fields: [
            { name: 'userId', message: 'Address not found for this user' },
          ],
        },
      };
    }

    const updated = await this.addressRepository.save({
      ...user.address,
      ...addressDto,
    });

    return {
      success: true,
      data: updated,
      error: null,
    };
  }

  async deleteUserAddress(userId: number): Promise<BaseResponse<null>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['address'],
    });

    if (!user || !user.address) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Address not found for user',
          cause: 'Entity not found',
          fields: [
            { name: 'userId', message: 'No address found for this user' },
          ],
        },
      };
    }

    await this.addressRepository.delete(user.address.id);

    return {
      success: true,
      data: null,
      error: null,
    };
  }
}
