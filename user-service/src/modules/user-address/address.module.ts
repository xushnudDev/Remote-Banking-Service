import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAddress } from "./entity";
import { User } from "../user/entity";
import { AddressController } from "./address.controller";
import { AddressService } from "./address.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserAddress,User])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}