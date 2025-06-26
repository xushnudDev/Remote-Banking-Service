import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserCompanyPermissionDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  permission_id: number;
}
