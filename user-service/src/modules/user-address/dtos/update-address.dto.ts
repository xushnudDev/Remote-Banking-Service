import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length, IsPositive } from "class-validator";

export class UpdateAddressDto {
  @ApiProperty({
    example: 1,
    description: 'Region ID',
  })
  @IsNumber()
  @IsPositive({ message: 'Region ID must be a positive integer' })
  region_id: number;

  @ApiProperty({
    example: 1,
    description: 'District ID',
  })
  @IsNumber()
  @IsPositive({ message: 'District ID must be a positive integer' })
  district_id: number;

  @ApiProperty({
    example: 'Chilonzor 12',
    description: 'Address',
  })
  @IsString()
  @Length(2, 255, { message: 'Address must be between 2 and 255 characters' })
  address: string;

  @ApiProperty({
    example: 2,
    description: 'User ID',
  })
  @IsNumber()
  @IsPositive({ message: 'User ID must be a positive integer' })
  user_id: number;
}
