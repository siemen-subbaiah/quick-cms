-- AlterSequence
ALTER SEQUENCE "WebHook_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "isAPIPublished" BOOL;
