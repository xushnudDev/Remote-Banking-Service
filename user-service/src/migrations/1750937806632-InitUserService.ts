import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUserService1750937806632 implements MigrationInterface {
    name = 'InitUserService1750937806632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_address" ("id" SERIAL NOT NULL, "region_id" integer NOT NULL, "district_id" integer NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_29d6df815a78e4c8291d3cf5e5" UNIQUE ("user_id"), CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_company_permission" ("user_company_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_659d6a93de4d23f355e111c590c" PRIMARY KEY ("user_company_id", "permission_id"))`);
        await queryRunner.query(`CREATE TABLE "user_company" ("id" SERIAL NOT NULL, "company_id" integer NOT NULL, "role_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_9e70b5f9d7095018e86970c7874" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_contact_type_enum" AS ENUM('phone', 'email')`);
        await queryRunner.query(`CREATE TYPE "public"."user_contact_status_enum" AS ENUM('new', 'active')`);
        await queryRunner.query(`CREATE TABLE "user_contact" ("id" SERIAL NOT NULL, "type" "public"."user_contact_type_enum" NOT NULL DEFAULT 'phone', "status" "public"."user_contact_status_enum" NOT NULL DEFAULT 'new', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_894dc440ade508fba6831724ec6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('new', 'active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "patronym" character varying NOT NULL, "pin" character varying(14) NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT 'new', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "address_id" integer, CONSTRAINT "REL_1b05689f6b6456680d538c3d2e" UNIQUE ("address_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_company_permission" ADD CONSTRAINT "FK_5b4a668f56a321730f2d858e322" FOREIGN KEY ("user_company_id") REFERENCES "user_company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_company" ADD CONSTRAINT "FK_2f89aead53ebdaaf3dca910ed56" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_contact" ADD CONSTRAINT "FK_a5816d3d0385f99ead46fb40173" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "user_address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "user_contact" DROP CONSTRAINT "FK_a5816d3d0385f99ead46fb40173"`);
        await queryRunner.query(`ALTER TABLE "user_company" DROP CONSTRAINT "FK_2f89aead53ebdaaf3dca910ed56"`);
        await queryRunner.query(`ALTER TABLE "user_company_permission" DROP CONSTRAINT "FK_5b4a668f56a321730f2d858e322"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_contact"`);
        await queryRunner.query(`DROP TYPE "public"."user_contact_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_contact_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_company"`);
        await queryRunner.query(`DROP TABLE "user_company_permission"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
    }

}
