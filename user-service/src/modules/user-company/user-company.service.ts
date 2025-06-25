import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entity";
import { Repository } from "typeorm";
import { UserCompany } from "./entity";
import { CreateUserCompanyDto } from "./dtos";
import { BaseResponse } from "src/common";

@Injectable()
export class UserCompanyService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserCompany)
        private readonly userCompanyRepository: Repository<UserCompany>,
        
    ) {}

    async createUserCompany(dto: CreateUserCompanyDto): Promise<BaseResponse<UserCompany>> {
        const user = await this.userRepository.findOne({
            where: {
                id: dto.user_id,
            }
        });
        if (!user) {
            return {
                success: false,
                data: null,
                error: {
                    code: 404,
                    message: 'User not found',
                    cause: 'Entity not found',
                    fields: [
                        { name: 'id', message: 'Provided ID not found in database' },
                    ],
                },
            };
        }
        const userCompany = this.userCompanyRepository.create({
            ...dto,
            user,
        });
        const savedUserCompany = await this.userCompanyRepository.save(userCompany);
        return {
            success: true,
            data: savedUserCompany,
            error: null,
        };
    };

    async findAll(): Promise<BaseResponse<UserCompany[]>> {
        const userCompanies = await this.userCompanyRepository.find({
            relations: ['user','permissions'],
        });
        return {
            success: true,
            data: userCompanies,
            error: null,
        };
    };

    async delete(id: number): Promise<BaseResponse<null>> {
        const userCompany = await this.userCompanyRepository.findOne({
            where: {
                id,
            },
            relations: ['user','permissions'],
        });
        if (!userCompany) {
            return {
                success: false,
                data: null,
                error: {
                    code: 404,
                    message: 'User Company not found',
                    cause: 'Entity not found',
                    fields: [
                        { name: 'id', message: 'Provided ID not found in database' },
                    ],
                },
            };
        }
        await this.userCompanyRepository.delete(id);
        return {
            success: true,
            data: null,
            error: null,
        };
    }
}