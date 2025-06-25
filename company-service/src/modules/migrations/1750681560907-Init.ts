import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750681560907 implements MigrationInterface {
    name = 'Init1750681560907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "tin" character(9) NOT NULL, "status" "public"."company_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_address" ("id" BIGSERIAL NOT NULL, "region_id" bigint NOT NULL, "district_id" bigint NOT NULL, "company_id" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_94eab1f5f65b2c641c0b5c4a06" UNIQUE ("company_id"), CONSTRAINT "PK_1333bb935c62afe403dd22e5372" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_address" ADD CONSTRAINT "FK_94eab1f5f65b2c641c0b5c4a067" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_address" DROP CONSTRAINT "FK_94eab1f5f65b2c641c0b5c4a067"`);
        await queryRunner.query(`DROP TABLE "company_address"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
    }

}
