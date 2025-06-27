import { Controller, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateUserDto, UpdateUserDto } from "./dtos";

@Controller()
export class UserMicroserviceController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern('create_user')
    async createUser(@Param() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    };

    @MessagePattern('get_all_users')
    async getAllUsers(@Param() page: number = 1, @Param() size: number = 10) {
        return this.userService.findAll(page, size);
    };

    @MessagePattern('get_user')
    async getUser(@Param() id: number) {
        return this.userService.findOne(id);
    };

    @MessagePattern('update_user')
    async updateUser(@Param() data: { id: number, updateDto: UpdateUserDto }) {
        return this.userService.updateUser(data.id, data.updateDto);
    };

    @MessagePattern('delete_user')
    async deleteUser(@Param() id: number) {
        return this.userService.deleteUser(id);
    }
}