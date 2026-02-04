/*
  Warnings:

  - Added the required column `experience` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "experience" TEXT NOT NULL;
