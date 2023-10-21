import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1697845393493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.users
                              (
                                  id         serial4 NOT NULL,
                                  tel      varchar NOT NULL,
                                  "name"     varchar NOT NULL DEFAULT (''),
                                  tg_name    varchar NOT NULL DEFAULT (''),
                                  "password" varchar NOT NULL,
                                  tg_session varchar NOT NULL DEFAULT (''),
                                  CONSTRAINT "PK_USER" PRIMARY KEY (id),
                                  CONSTRAINT "UQ_USER_TG_NAME" UNIQUE (tg_name),
                                  CONSTRAINT "UQ_USER_TEL" UNIQUE (tel)
                              );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS public.users;`);
  }
}
