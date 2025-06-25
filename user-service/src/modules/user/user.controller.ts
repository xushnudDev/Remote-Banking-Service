import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dtos";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async create(@Body() data: CreateUserDto) {
        return await this.userService.createUser(data);
    };

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users fetched successfully' })
    async getAll() {
        return await this.userService.findAll();
    };

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User fetched successfully' })
    async getById(@Param('id') id: number) {
        return await this.userService.findOne(id);
    };

    @Put(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
        return await this.userService.updateUser(id, data);
    };

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async delete(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    };
    
}