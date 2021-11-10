import {MigrationInterface, QueryRunner} from "typeorm";

export class NewDataSetPartnerData1633109904093 implements MigrationInterface {
    name = 'NewDataSetPartnerData1633109904093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "partner_type" integer NOT NULL, "mobile_phone" character varying NOT NULL, "name_partner" character varying NOT NULL, "vat_number" character varying NOT NULL, "street" character varying NOT NULL, "street_number" character varying NOT NULL, "city" character varying NOT NULL, "city_postcode" character varying NOT NULL, "country" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_37ac2598b3b436bc6eace90aad" UNIQUE ("userId"), CONSTRAINT "PK_f666ae85a07cf7a5bb197c31334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."herinnering" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "partner_data" ADD CONSTRAINT "FK_37ac2598b3b436bc6eace90aad5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner_data" DROP CONSTRAINT "FK_37ac2598b3b436bc6eace90aad5"`);
        await queryRunner.query(`ALTER TABLE "public"."herinnering" ALTER COLUMN "status" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TABLE "partner_data"`);
    }

}
