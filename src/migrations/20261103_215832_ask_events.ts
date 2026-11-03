import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ask_events_outcome" AS ENUM('answered', 'limited');
  CREATE TABLE "ask_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"outcome" "enum_ask_events_outcome" DEFAULT 'answered' NOT NULL,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ask_events_id" integer;
  CREATE INDEX "ask_events_ip_hash_idx" ON "ask_events" USING btree ("ip_hash");
  CREATE INDEX "ask_events_updated_at_idx" ON "ask_events" USING btree ("updated_at");
  CREATE INDEX "ask_events_created_at_idx" ON "ask_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ask_events_fk" FOREIGN KEY ("ask_events_id") REFERENCES "public"."ask_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ask_events_id_idx" ON "payload_locked_documents_rels" USING btree ("ask_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ask_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ask_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ask_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_ask_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ask_events_id";
  DROP TYPE "public"."enum_ask_events_outcome";`)
}
