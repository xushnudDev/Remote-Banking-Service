import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserCompanyDto {
  @ApiProperty({
    example: 3,
    description: 'User ID',
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 12,
    description: 'Company ID',
  })
  @IsNumber()
  company_id: number;

  @ApiProperty({
    example: 2,
    description: 'Role ID',
  })
  @IsNumber()
  role_id: number;
}
