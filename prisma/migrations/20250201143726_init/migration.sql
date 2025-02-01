-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "host_id" TEXT NOT NULL,
    "session_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);
