import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserContact } from "./entity";
import { User } from "../user/entity";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserContact,User])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}