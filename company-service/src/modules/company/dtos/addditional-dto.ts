import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from './create-company.dto';
import { CreateAddressDto } from './create-company-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyWithAddressDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  company: CreateCompanyDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
