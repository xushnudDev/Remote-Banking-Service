import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity';
import { Repository } from 'typeorm';
import { UserCompany } from './entity/user-company.entity';
import { CreateUserCompanyDto, UpdateUserCompanyDto } from './dtos';
import { BaseResponse } from 'src/common';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
  ) {}

  async createUserCompany(
    userId: number,
    dto: CreateUserCompanyDto,
  ): Promise<BaseResponse<UserCompany>> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'User not found',
          cause: 'Entity not found',
          fields: [{ name: 'userId', message: 'User not found in DB' }],
        },
      };
    }

    const userCompany = this.userCompanyRepository.create({
      ...dto,
      user,
    });
    const saved = await this.userCompanyRepository.save(userCompany);

    return { success: true, data: saved, error: null };
  }

  async findAll(): Promise<BaseResponse<UserCompany[]>> {
    const userCompanies = await this.userCompanyRepository.find({
      relations: ['user', 'permissions'],
    });

    return { success: true, data: userCompanies, error: null };
  }

  async findByUserId(userId: number): Promise<BaseResponse<UserCompany[]>> {
    const data = await this.userCompanyRepository.find({
      where: { user: { id: userId } },
      relations: ['permissions'],
    });

    return { success: true, data, error: null };
  }

  async update(
    companyId: number,
    dto: UpdateUserCompanyDto,
  ): Promise<BaseResponse<UserCompany>> {
    const userCompany = await this.userCompanyRepository.findOne({
      where: { id: companyId },
    });

    if (!userCompany) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'UserCompany not found',
          cause: 'Entity not found',
          fields: [{ name: 'id', message: 'UserCompany ID not found' }],
        },
      };
    }

    const updated = await this.userCompanyRepository.save({
      ...userCompany,
      ...dto,
    });

    return { success: true, data: updated, error: null };
  }

  async delete(id: number): Promise<BaseResponse<null>> {
    const userCompany = await this.userCompanyRepository.findOne({
      where: { id },
    });

    if (!userCompany) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'UserCompany not found',
          cause: 'Entity not found',
          fields: [{ name: 'id', message: 'UserCompany ID not found' }],
        },
      };
    }

    await this.userCompanyRepository.delete(id);
    return { success: true, data: null, error: null };
  }
}
