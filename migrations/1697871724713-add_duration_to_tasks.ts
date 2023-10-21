import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDurationToTasks1697871724713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.tasks ADD duration integer;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.tasks DROP COLUMN IF EXISTS duration;`,
    );
  }
}
