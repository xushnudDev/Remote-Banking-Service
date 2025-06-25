import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User, UserAddress, UserCompany, UserCompanyPermission, UserContact } from './modules';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, UserAddress, UserCompany, UserCompanyPermission, UserContact],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
