/*
  Warnings:

  - You are about to drop the column `test` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "test",
ALTER COLUMN "email" DROP NOT NULL;
