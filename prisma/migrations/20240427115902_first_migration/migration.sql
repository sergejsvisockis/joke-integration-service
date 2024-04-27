-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "joke" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Joke_id_key" ON "Joke"("id");
