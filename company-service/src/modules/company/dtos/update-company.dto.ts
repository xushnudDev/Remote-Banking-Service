import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, Length, Matches } from 'class-validator';
import { CompanyStatus } from '../entities';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({
    description: 'Company name',
    example: 'Company name',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string;

  @ApiPropertyOptional({
    description: 'Company tin',
    example: '123456789',
  })
  @Length(9, 9, { message: 'TIN must be exactly 9 digits long' })
  @Matches(/^\d+$/, { message: 'TIN must contain only digits' })
  tin: string;

  @ApiPropertyOptional({
    description: 'Company status',
    example: 'active',
    required: false,
  })
  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus = CompanyStatus.ACTIVE;
}
