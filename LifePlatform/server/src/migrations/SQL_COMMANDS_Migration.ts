// import {MigrationInterface, QueryRunner} from "typeorm";

// export class NewStructureLiveData1618661955656 implements MigrationInterface {
//     name = 'NewStructureLiveData1618661955656'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying, "status" integer NOT NULL, "paginaId" uuid NOT NULL, "creatorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        
//         await queryRunner.query(`ALTER TABLE "herinnering" ADD "status" integer NOT NULL DEFAULT 2`);

//         //STATUS opzetten van prive en intieme_kring
//         await queryRunner.query(`UPDATE "herinnering" 
//                                 SET "status" = 4
//                                 WHERE "prive" = true;
//                                 `);

//         await queryRunner.query(`UPDATE "herinnering" 
//                                 SET "status" = 3
//                                 WHERE "intieme_kring" = true;
//                                 `);

//         //drop columns
//         await queryRunner.query(`ALTER TABLE "herinnering" DROP COLUMN "intieme_kring"`);
//         await queryRunner.query(`ALTER TABLE "herinnering" DROP COLUMN "prive"`);
       
       
//         await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "height"`);
//         await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "width"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "payment_type"`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "mollieCustomerId" text`);
//         await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5e1aa19a4ea0b6cbab1077eccfd" UNIQUE ("mollieCustomerId")`);
//         await queryRunner.query(`ALTER TABLE "user" ADD "account_status" integer NOT NULL DEFAULT '0'`);
        
//         await queryRunner.query(`ALTER TABLE "comment" ADD "messageId" uuid`);
//         await queryRunner.query(`ALTER TABLE "media" ADD "messageId" uuid`);

//         //Status standaard op 1 zetten (VALID)
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "Payment_status" integer NOT NULL DEFAULT '1'`);
//         //Status standaard op 0 zetten (FREE)
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "Payment_plan" integer NOT NULL DEFAULT '0'`);


//         //These 3 are new compared to number_of_memories, number_of_condolances and number_of_personal_messages
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "number_of_messages" integer NOT NULL DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "number_of_media" integer NOT NULL DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "number_of_people" integer NOT NULL DEFAULT '0'`);
         


//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "ValidUntil" DROP NOT NULL`);
        
        
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."ValidUntil" IS NULL`);

//         //Set number of memories
//         await queryRunner.query(`UPDATE "herdenkings_pagina" as p
//                                 SET "number_of_memories" = 
//                                     (SELECT COUNT(*)
//                                     FROM "herinnering" as h
//                                     WHERE h."paginaId" = p."id");
//                                 `);

//         //Set number of personal messages
//         await queryRunner.query(`UPDATE "herdenkings_pagina" as p
//                                 SET "number_of_personal_messages" = 
//                                     (SELECT COUNT(*)
//                                     FROM "personal_message" as pm
//                                     WHERE pm."paginaId" = p."id");
//                                 `);
//         //Set number of condolances
//         await queryRunner.query(`UPDATE "herdenkings_pagina" as p
//                                 SET "number_of_condolances" = 
//                                     (SELECT COUNT(*)
//                                     FROM "condolatie" as c
//                                     WHERE c."paginaId" = p."id");
//                                 `);
//         //Set number of people (-1 because of the owner)
//         await queryRunner.query(`UPDATE "herdenkings_pagina" as p
//                                 SET "number_of_people" = 
//                                     (SELECT COUNT(*)
//                                     FROM "access_request" as ar
//                                     WHERE ar."paginaId" = p."id") -1 ;
//                                 `);


//         //Set number of media = number of media from herin + condol + personal message
//         await queryRunner.query(`UPDATE "herdenkings_pagina" as p
//                                 SET "number_of_media" = 
//                                     (
//                                         (SELECT COUNT(*)
//                                         FROM "media" as m
//                                         WHERE m."herinneringId" IN (SELECT h."id" 
//                                                                     FROM "herinnering" as h
//                                                                     WHERE h."paginaId" = p."id" )
//                                         )
//                                     +
//                                         (SELECT COUNT(*)
//                                         FROM "media" as m
//                                         WHERE m."condolatieId" IN (SELECT c."id" 
//                                                                     FROM "condolatie" as c
//                                                                     WHERE c."paginaId" = p."id" )
//                                         )
//                                     +
                                    
//                                         (SELECT COUNT(*)
//                                         FROM "media" as m
//                                         WHERE m."persoonlijkeboodschapId" IN (SELECT pm."id" 
//                                                                     FROM "personal_message" as pm
//                                                                     WHERE pm."paginaId" = p."id" )
//                                         )
//                                     );
//                                 `);


//         //Delete manually the bad emails

//         // Set all emails to lower case
//         //TODO: aanzetten
//         // await queryRunner.query(`UPDATE "user" 
//         //                         SET "email" = LOWER("email")
                                   
//         //                         `);


//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_memories" SET NOT NULL`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_memories" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_memories" SET DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_personal_messages" SET NOT NULL`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_personal_messages" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_personal_messages" SET DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_condolances" SET NOT NULL`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_condolances" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_condolances" SET DEFAULT '0'`);
//         await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_00efdd1cf5fe0f6fffab9919263" FOREIGN KEY ("paginaId") REFERENCES "herdenkings_pagina"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_e04040c4ea7133eeddefff6417d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c39b277289b80ba8e22bfb2c234" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_063d6152c07ac0135836770b934" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_063d6152c07ac0135836770b934"`);
//         await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c39b277289b80ba8e22bfb2c234"`);
//         await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_e04040c4ea7133eeddefff6417d"`);
//         await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_00efdd1cf5fe0f6fffab9919263"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_condolances" DROP DEFAULT`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_condolances" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_condolances" DROP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_personal_messages" DROP DEFAULT`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_personal_messages" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_personal_messages" DROP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_memories" DROP DEFAULT`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."number_of_memories" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "number_of_memories" DROP NOT NULL`);
//         await queryRunner.query(`COMMENT ON COLUMN "herdenkings_pagina"."ValidUntil" IS NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ALTER COLUMN "ValidUntil" SET NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "number_of_people"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "number_of_media"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "number_of_messages"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "Payment_plan"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" DROP COLUMN "Payment_status"`);
//         await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "messageId"`);
//         await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "messageId"`);
//         await queryRunner.query(`ALTER TABLE "herinnering" DROP COLUMN "status"`);
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "account_status"`);
//         await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5e1aa19a4ea0b6cbab1077eccfd"`);
//         await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mollieCustomerId"`);
//         await queryRunner.query(`ALTER TABLE "herdenkings_pagina" ADD "payment_type" text NOT NULL DEFAULT 'free'`);
//         await queryRunner.query(`ALTER TABLE "media" ADD "width" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "media" ADD "height" integer NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "herinnering" ADD "prive" boolean NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "herinnering" ADD "intieme_kring" boolean NOT NULL`);
//         await queryRunner.query(`DROP TABLE "message"`);
//     }

// }
