import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrackerFeature1697851955719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.workspaces
        (
            id        serial4 NOT NULL,
            "ownerId" int4 NULL,
            CONSTRAINT "PK_WORKSPACE_ID" PRIMARY KEY (id),
            CONSTRAINT "REL_OWNER_USER_ID" UNIQUE ("ownerId"),
            CONSTRAINT "FK_OWNER_USER_ID" FOREIGN KEY ("ownerId") REFERENCES public.users (id)
        );
        CREATE TABLE public.workspace_users
        (
            id            serial4 NOT NULL,
            "workspaceId" int4    NOT NULL,
            "userId"      int4    NOT NULL,
            "role"        int4    NOT NULL,
            CONSTRAINT "PK_WORKSPACE_USERS_PRIMARY_ID" PRIMARY KEY (id)
        );



            ALTER TABLE public.workspace_users
            ADD CONSTRAINT "FK_WORKSPACE_USERS_ID" FOREIGN KEY ("userId") REFERENCES public.users (id) ON DELETE CASCADE;
            ALTER TABLE public.workspace_users
            ADD CONSTRAINT "FK_WORKSPACE_WORKSPACES_ID" FOREIGN KEY ("workspaceId") REFERENCES public.workspaces (id) ON DELETE CASCADE;

            CREATE TABLE public.projects
            (
                id            serial4 NOT NULL,
                "name"        varchar NOT NULL,
                "tgChatId"    varchar NOT NULL,
                "workspaceId" int4 NULL,
                CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id),
                CONSTRAINT "UQ_453a213cdb5218bda580d888093" UNIQUE ("tgChatId"),
                CONSTRAINT "FK_108ff8a2d40c2b294511c92a7c8" FOREIGN KEY ("workspaceId") REFERENCES public.workspaces (id)
            );

            CREATE TABLE public.tasks
            (
                id          serial4 NOT NULL,
                status      int4    NOT NULL DEFAULT 0,
                title       varchar NOT NULL,
                description varchar NOT NULL,
                "tgChatId"  varchar NOT NULL,
                messages    jsonb   NOT NULL DEFAULT '[]'::jsonb,
                "ownerId"   int4 NULL,
                "projectId" int4 NULL,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id),
                CONSTRAINT "UQ_174db9fc08d22adf5e5f55366aa" UNIQUE ("tgChatId"),
                CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES public.users (id),
                CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES public.projects (id)
            );

            CREATE TABLE public.tasks_users_users
            (
                "tasksId" int4 NOT NULL,
                "usersId" int4 NOT NULL,
                CONSTRAINT "PK_ae091e146528c6ab778ee1cd555" PRIMARY KEY ("tasksId", "usersId"),
                CONSTRAINT "FK_441b92c07ddf55702aceea3dcac" FOREIGN KEY ("tasksId") REFERENCES public.tasks (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_84ce7d86b6daee2eb4f51b3a54f" FOREIGN KEY ("usersId") REFERENCES public.users (id) ON DELETE CASCADE ON UPDATE CASCADE
            );
            CREATE INDEX "IDX_441b92c07ddf55702aceea3dca" ON public.tasks_users_users USING btree ("tasksId");
            CREATE INDEX "IDX_84ce7d86b6daee2eb4f51b3a54" ON public.tasks_users_users USING btree ("usersId");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.workspaces CASCADE;
            DROP TABLE IF EXISTS public.workspace_users CASCADE;
            DROP TABLE IF EXISTS public.projects CASCADE;
            DROP TABLE IF EXISTS public.tasks CASCADE;
            DROP TABLE IF EXISTS public.tasks_users_users CASCADE;
      `);
  }
}
