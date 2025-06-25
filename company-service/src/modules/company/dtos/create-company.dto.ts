import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
import { CompanyStatus } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Company name',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  name: string;

  @ApiProperty({
    description: 'Company tin',
    example: '123456789',
  })
  @IsString()
  @Length(9, 9, { message: 'TIN must be exactly 9 digits long' })
  @Matches(/^\d+$/, { message: 'TIN must contain only digits' })
  tin: string;

  @ApiProperty({
    description: 'Company status',
    example: 'active',
    required: false,
  })
  @IsEnum(CompanyStatus)
  @IsOptional()
  status?: CompanyStatus = CompanyStatus.ACTIVE;
}
