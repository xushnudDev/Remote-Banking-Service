import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Region id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    description: 'District id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    description: 'Company id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
