/*
  Warnings:

  - You are about to drop the column `hostName` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `is_host` to the `Participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participants" ADD COLUMN     "is_host" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "hostName",
ALTER COLUMN "host_id" DROP NOT NULL;
