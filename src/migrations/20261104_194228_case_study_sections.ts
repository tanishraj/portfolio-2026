import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "case_studies_constraints" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_next" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "case_studies_decisions" ADD COLUMN "tradeoff" varchar;
  ALTER TABLE "case_studies_constraints" ADD CONSTRAINT "case_studies_constraints_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_architecture" ADD CONSTRAINT "case_studies_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_stories" ADD CONSTRAINT "case_studies_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_next" ADD CONSTRAINT "case_studies_next_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "case_studies_constraints_order_idx" ON "case_studies_constraints" USING btree ("_order");
  CREATE INDEX "case_studies_constraints_parent_id_idx" ON "case_studies_constraints" USING btree ("_parent_id");
  CREATE INDEX "case_studies_architecture_order_idx" ON "case_studies_architecture" USING btree ("_order");
  CREATE INDEX "case_studies_architecture_parent_id_idx" ON "case_studies_architecture" USING btree ("_parent_id");
  CREATE INDEX "case_studies_stories_order_idx" ON "case_studies_stories" USING btree ("_order");
  CREATE INDEX "case_studies_stories_parent_id_idx" ON "case_studies_stories" USING btree ("_parent_id");
  CREATE INDEX "case_studies_next_order_idx" ON "case_studies_next" USING btree ("_order");
  CREATE INDEX "case_studies_next_parent_id_idx" ON "case_studies_next" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "case_studies_constraints" CASCADE;
  DROP TABLE "case_studies_architecture" CASCADE;
  DROP TABLE "case_studies_stories" CASCADE;
  DROP TABLE "case_studies_next" CASCADE;
  ALTER TABLE "case_studies_decisions" DROP COLUMN "tradeoff";`)
}
