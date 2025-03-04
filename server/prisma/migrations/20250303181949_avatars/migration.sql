/*
  Warnings:

  - Added the required column `avatar` to the `Participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participants" ADD COLUMN     "avatar" TEXT NOT NULL;
