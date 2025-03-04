/*
  Warnings:

  - You are about to drop the column `host_id` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `votingType` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `is_votes_visible` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "host_id",
DROP COLUMN "votingType",
ADD COLUMN     "is_votes_visible" BOOLEAN NOT NULL,
ADD COLUMN     "voting_type" TEXT;
