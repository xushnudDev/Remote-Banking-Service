import { Controller } from '@nestjs/common';
import { CompanyService } from './company.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCompanyWithAddressDto, UpdateAddressDto, UpdateCompanyDto } from './dtos';

@Controller('company')
export class CompanyMicroserviceController {
  constructor(private readonly companyService: CompanyService) {}

  

  @MessagePattern('get_companies')
  async getCompanies() {
    return this.companyService.findAll();
  }

  @MessagePattern('get_company')
  async getCompany(@Payload() id: number) {
    return this.companyService.findOne(id);
  }

  @MessagePattern('update_company')
  async updateCompany(
    @Payload() data: { id: number; companyDto: UpdateCompanyDto },
  ) {
    return this.companyService.updateCompany(data.id, data.companyDto);
  };

  @MessagePattern('delete_company')
  async deleteCompany(@Payload() id: number) {
    return this.companyService.deleteCompany(id);
  };

  @MessagePattern('get_addresses')
  async getAddresses() {
    return this.companyService.findAllAddresses();
  };

  @MessagePattern('get_address')
  async getAddress(@Payload() id: number) {
    return this.companyService.findOneAddress(id);
  };

  @MessagePattern('update_address')
  async updateAddress(
    @Payload() data: { id: number; addressDto: UpdateAddressDto },
  ) {
    return this.companyService.updateAddress(data.id, data.addressDto);
  };

  @MessagePattern('delete_address')
  async deleteAddress(@Payload() id: number) {
    return this.companyService.deleteCompany(id);
  }
}
