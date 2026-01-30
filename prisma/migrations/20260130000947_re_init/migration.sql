/*
  Warnings:

  - You are about to drop the column `availability` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `averageRating` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the `_TutorCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `availabilityId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "_TutorCategories" DROP CONSTRAINT "_TutorCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_TutorCategories" DROP CONSTRAINT "_TutorCategories_B_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "availabilityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "subjects" TEXT[];

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "availability",
DROP COLUMN "averageRating",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "subjects" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileAvater" TEXT;

-- DropTable
DROP TABLE "_TutorCategories";

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
