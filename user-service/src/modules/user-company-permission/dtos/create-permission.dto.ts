import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserCompanyPermissionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  user_company_id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  permission_id: number;
}
