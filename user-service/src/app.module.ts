import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule, ContactModule, User, UserAddress, UserCompany, UserCompanyModule, UserCompanyPermission, UserContact, UserModule, UserPermissionModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User,UserCompany,UserAddress,UserContact,UserCompanyPermission],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    AddressModule,
    UserCompanyModule,
    ContactModule,
    UserPermissionModule,
  ],
})
export class AppModule {}
