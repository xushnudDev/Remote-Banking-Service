import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { UserStatus } from "../entity";

export class UpdateUserDto {
    @ApiProperty({
        description: 'User first name',
        example: 'John',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'First name must contain only letters and spaces',
    })
    @Length(3, 255, { message: 'First name must be between 3 and 255 characters' })
    firstname: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Doe',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Last name must contain only letters and spaces',
    })
    @Length(3, 255, { message: 'Last name must be between 3 and 255 characters' })
    lastname: string;

    @ApiProperty({
        description: "User patronym",
        example: "Ivan"
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Patronym must contain only letters and spaces',
    })
    @Length(3, 255, { message: 'Patronym must be between 3 and 255 characters' })
    patronym: string;

    @ApiProperty({
        description: "User pin",
        example: "12345678901234"
    })
    @IsString()
    @IsNotEmpty()
    @Length(14, 14, { message: 'PIN must be exactly 14 digits long' })
    @Matches(/^\d+$/, { message: 'PIN must contain only digits' })
    pin: string;

    @ApiProperty({
        description: "User status",
        example: "new",
        required: false
    })
    @IsEnum(UserStatus)
    @IsOptional()
    status?: UserStatus = UserStatus.NEW;

}