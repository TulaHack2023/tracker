import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1697845393493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.users
                              (
                                  id         serial4 NOT NULL,
                                  email      varchar NOT NULL,
                                  "name"     varchar NOT NULL,
                                  tg_name    varchar NOT NULL,
                                  "password" varchar NOT NULL,
                                  CONSTRAINT "PK_USER" PRIMARY KEY (id),
                                  CONSTRAINT "UQ_USER_TG_NAME" UNIQUE (tg_name),
                                  CONSTRAINT "UQ_USER_EMAIL" UNIQUE (email)
                              );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.users;`);
  }
}
