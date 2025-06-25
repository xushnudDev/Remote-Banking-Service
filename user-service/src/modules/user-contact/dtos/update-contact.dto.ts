import { ApiProperty } from "@nestjs/swagger";
import { ContactStatus, ContactType } from "../entity";
import { IsEnum, Matches } from "class-validator";

export class UpdateContactDto {
    @ApiProperty({
        description: 'Contact type',
        enum: ['phone', 'email'],
        default: 'phone',
    })
    @IsEnum(ContactType,{message: 'Invalid contact type'})
    type: ContactType;

    @ApiProperty({
        example: 'new',
        description: 'Contact status',
    })
    @IsEnum(ContactStatus,{message: 'Invalid contact status'})
    status: ContactStatus;

    @ApiProperty({
        example: '1',
        description: 'User ID',
    })
    user_id: number
}