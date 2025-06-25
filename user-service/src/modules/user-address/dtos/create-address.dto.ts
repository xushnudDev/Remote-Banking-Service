import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateAddressDto {
  @ApiProperty({
    example: 1,
    description: 'Region ID',
  })
  @Matches(/^[1-9][0-9]*$/, { message: 'Region ID must be a positive integer' })
  @IsNumber()
  region_id: number;

  @ApiProperty({
    example: 1,
    description: 'District ID',
  })
  @Matches(/^[1-9][0-9]*$/, { message: 'District ID must be a positive integer' })
  @IsNumber()
  district_id: number;

  @ApiProperty({
    example: 'Chilonzor 12-uy',
    description: 'Address',
  })
  @Matches(/^[a-zA-Z0-9\s\-\,\.]+$/, { message: 'Address can only contain letters, numbers and basic punctuation' })
  @Length(2, 255, { message: 'Address must be between 2 and 255 characters' })
  @IsString()
  address: string;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsNumber()
  @Matches(/^[1-9][0-9]*$/, { message: 'User ID must be a positive integer' })
  user_id: number;
}
