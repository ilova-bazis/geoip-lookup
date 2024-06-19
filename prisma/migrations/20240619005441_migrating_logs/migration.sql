/*
  Warnings:

  - The primary key for the `geonames` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('INITIAL', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "geonames" DROP CONSTRAINT "geonames_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "population" SET DATA TYPE BIGINT,
ALTER COLUMN "elevation" SET DATA TYPE BIGINT,
ADD CONSTRAINT "geonames_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "geoname_sync_logs" (
    "id" SERIAL NOT NULL,
    "action" "Action" NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "geoname_sync_logs_pkey" PRIMARY KEY ("id")
);
