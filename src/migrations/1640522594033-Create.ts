import {MigrationInterface, QueryRunner} from "typeorm";

export class Create1640522594033 implements MigrationInterface {
    name = 'Create1640522594033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "last_used_org_id" character varying NOT NULL, "email" character varying NOT NULL, "location" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "gender" character varying NOT NULL, "phone" character varying NOT NULL, "referral_code" character varying NOT NULL, "created_by_method" character varying NOT NULL, "notify" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "org_member" ("id" SERIAL NOT NULL, "org_id" character varying(128) NOT NULL, "user_id" character varying(128) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "added_by" character varying(128) NOT NULL, "role" character varying(128) NOT NULL, "scopes" text NOT NULL, "orgId" uuid, "userId" uuid, CONSTRAINT "PK_572a1b79344c45cba61e93eb34c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "scopes" text NOT NULL, "email" character varying NOT NULL, "url" character varying NOT NULL, "is_hiring" boolean NOT NULL DEFAULT false, "is_admitting" boolean NOT NULL DEFAULT false, "plan" character varying NOT NULL, "mode" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invite_link" ("id" SERIAL NOT NULL, "org_id" character varying(128) NOT NULL, "expires_at" TIMESTAMP NOT NULL, "scopes" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(128) NOT NULL, "orgId" uuid, "createdBy" uuid, CONSTRAINT "PK_2baa9c7c5811e4143fa5d4c7b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "org_member" ADD CONSTRAINT "FK_0994de574a3dd40608e7dc7e3d7" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "org_member" ADD CONSTRAINT "FK_e51b569198779321f3d818d8f24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invite_link" ADD CONSTRAINT "FK_63092a00ed23acc5b2cc5a28dbb" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invite_link" ADD CONSTRAINT "FK_d2241cc00d57024ea15d8a1e134" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_link" DROP CONSTRAINT "FK_d2241cc00d57024ea15d8a1e134"`);
        await queryRunner.query(`ALTER TABLE "invite_link" DROP CONSTRAINT "FK_63092a00ed23acc5b2cc5a28dbb"`);
        await queryRunner.query(`ALTER TABLE "org_member" DROP CONSTRAINT "FK_e51b569198779321f3d818d8f24"`);
        await queryRunner.query(`ALTER TABLE "org_member" DROP CONSTRAINT "FK_0994de574a3dd40608e7dc7e3d7"`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "invite_link"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "org_member"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
