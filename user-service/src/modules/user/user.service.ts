import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from './entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { BaseResponse, PageableResponse } from 'src/common';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<BaseResponse<User>> {
    const foundedUser = await this.userRepository.findOne({
      where: { pin: userDto.pin },
    });

    if (foundedUser) {
      return {
        success: false,
        data: null,
        error: {
          code: 409,
          message: 'User already exists',
          cause: 'user already exists in database',
        },
      };
    }
    const user = this.userRepository.create({
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      patronym: userDto.patronym,
      pin: userDto.pin,
      status: UserStatus.NEW,
    });

    const savedUser = await this.userRepository.save(user);
    return {
      success: true,
      data: savedUser,
      error: null,
    };
  }

  async findAll(
    page: number = 1,
    size: number = 10,
  ): Promise<PageableResponse<User[]>> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    return {
      success: true,
      data: users,
      error: null,
      totalElements: total,
      page,
      size,
    };
  }

  async findOne(id: number): Promise<BaseResponse<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User not found',
          cause: 'Entity not found',
        },
      };
    }
    return {
      success: true,
      data: user,
      error: null,
    };
  }

  async updateUser(
    id: number,
    updateDto: UpdateUserDto,
  ): Promise<BaseResponse<User>> {
    const result = await this.userRepository.update(id, updateDto);
    if (result.affected === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User not found',
          cause: 'Entity not found',
        },
      };
    }
    const updated = await this.userRepository.findOne({
      where: { id },
    });
    return {
      success: true,
      data: updated,
      error: null,
    };
  }

  async deleteUser(id: number): Promise<BaseResponse<null>> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User not found',
          cause: 'Entity not found',
        },
      };
    }
    return {
      success: true,
      data: null,
      error: null,
    };
  }
}
