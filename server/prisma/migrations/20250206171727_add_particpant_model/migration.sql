-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "participant_name" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "has_voted" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);
