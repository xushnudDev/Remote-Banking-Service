import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "./create-company-address.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @ApiProperty({
        description: 'Region id',
        example: 1,
    })
    regionId: number

    @ApiProperty({
        description: 'District id',
        example: 1,
    })
    districtId: number

    @ApiProperty({
        description: 'Company id',
        example: 1,
    })
    companyId: number
}