/*
  Warnings:

  - Added the required column `votingType` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "votingType" TEXT NOT NULL;
