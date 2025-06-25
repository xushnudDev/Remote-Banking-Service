import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company, CompanyAddress, CompanyStatus } from './entities';
import { Repository } from 'typeorm';
import {
  CreateAddressDto,
  CreateCompanyDto,
  UpdateAddressDto,
  UpdateCompanyDto,
} from './dtos';
import { BaseResponse, ErrorField, PageableResponse } from './common';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyAddress)
    private readonly addressRepository: Repository<CompanyAddress>,
  ) {}

  async createCompany(
  companyDto: CreateCompanyDto,
): Promise<BaseResponse<Company>> {
  const errors: ErrorField[] = [];

  const tinExists = await this.companyRepository.findOne({
    where: { tin: companyDto.tin },
  });

  if (tinExists) {
    errors.push({ name: 'tin', message: 'TIN must be unique' });
  }

  const nameExists = await this.companyRepository.findOne({
    where: { name: companyDto.name },
  });

  if (nameExists) {
    errors.push({ name: 'name', message: 'Company name must be unique' });
  }

  if (errors.length > 0) {
    return {
      success: false,
      data: null,
      error: {
        code: 409,
        message: 'Validation error',
        cause: 'One or more fields must be unique',
        fields: errors,
      },
    };
  }

  const company = this.companyRepository.create({
    name: companyDto.name,
    tin: companyDto.tin,
    status: companyDto.status ?? CompanyStatus.ACTIVE,
  });
  const savedCompany = await this.companyRepository.save(company);

  return {
    success: true,
    data: savedCompany,
    error: null,
  };
}

  async findAll(
    page: number = 1,
    size: number = 10,
  ): Promise<PageableResponse<Company[]>> {
    const [companies, total] = await this.companyRepository.findAndCount({
      relations: ['address'],
      skip: (page - 1) * size,
      take: size,
    });
    return {
      success: true,
      data: companies,
      error: null,
      totalElements: total,
      page,
      size,
    };
  }

  async findOne(id: number): Promise<BaseResponse<Company>> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['address'],
    });
    if (!company) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Company not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    return {
      success: true,
      data: company,
      error: null,
    };
  }

  async updateCompany(
    id: number,
    companyDto: UpdateCompanyDto,
  ): Promise<BaseResponse<Company>> {
    const result = await this.companyRepository.update(id, companyDto);
    if (result.affected === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Company not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    const updated = await this.companyRepository.findOne({
      where: { id },
      relations: ['address'],
    });
    return {
      success: true,
      data: updated,
      error: null,
    };
  }

  async deleteCompany(id: number): Promise<BaseResponse<null>> {
    await this.addressRepository.delete({ companyId: id });

    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Company not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    return {
      success: true,
      data: null,
      error: null,
    };
  }

  async createAddress(
    addressDto: CreateAddressDto,
  ): Promise<BaseResponse<CompanyAddress>> {
    const foundedAddress = await this.addressRepository.findOne({
      where: { companyId: addressDto.companyId },
    });
    if (foundedAddress) {
      return {
        success: false,
        data: null,
        error: {
          code: 409,
          message: 'Address already exists',
          cause: 'Address already exists',
          fields: [{ name: 'companyId', message: 'Address already exists' }],
        },
      };
    }
    const address = this.addressRepository.create({
      regionId: addressDto.regionId,
      districtId: addressDto.districtId,
      companyId: addressDto.companyId,
    });
    await this.addressRepository.save(address);
    return {
      success: true,
      data: address,
      error: null,
    };
  }

  async findAllAddresses(): Promise<BaseResponse<CompanyAddress[]>> {
    const addresses = await this.addressRepository.find({
      relations: ['company'],
    });
    if (!addresses) {
      return {
        success: false,
        data: null,
        error: {
          code: 404,
          message: 'Addresses not found',
          cause: 'Entity not found',
          fields: [
            { name: 'id', message: 'Provided ID not found in database' },
          ],
        },
      };
    }
    return {
      success: true,
      data: addresses,
      error: null,
    };
  }

  async findOneAddress(
    companyId: number,
  ): Promise<BaseResponse<CompanyAddress>> {
    const address = await this.addressRepository.findOne({
      where: { companyId },
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
  }

  async updateAddress(
    companyId: number,
    addressDto: UpdateAddressDto,
  ): Promise<BaseResponse<CompanyAddress>> {
    const result = await this.addressRepository.update(companyId, addressDto);
    if (result.affected === 0) {
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
    const updated = await this.addressRepository.findOne({
      where: { companyId },
      relations: ['company'],
    });
    return {
      success: true,
      data: updated,
      error: null,
    };
  }

  async deleteAddress(companyId: number): Promise<BaseResponse<null>> {
    const result = await this.addressRepository.delete(companyId);
    if (result.affected === 0) {
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
      data: null,
      error: null,
    };
  }
}
