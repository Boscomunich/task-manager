-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_listId_fkey";

-- DropForeignKey
ALTER TABLE "CheckList" DROP CONSTRAINT "CheckList_cardId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
