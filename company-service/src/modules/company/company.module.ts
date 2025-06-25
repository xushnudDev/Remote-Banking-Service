import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company, CompanyAddress } from "./entities";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, CompanyAddress]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}