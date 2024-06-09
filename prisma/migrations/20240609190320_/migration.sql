-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_pageId_fkey";

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
