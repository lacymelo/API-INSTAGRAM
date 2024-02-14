-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hashtags" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
