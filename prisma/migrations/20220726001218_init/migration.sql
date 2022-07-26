-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twentyFourId" TEXT NOT NULL,
    "username" TEXT,
    "customName" TEXT,
    "email" TEXT,
    "avatarUrl" TEXT,
    "firstTime" BOOLEAN,
    "isTwoFactorAuthenticationEnabled" BOOLEAN,
    "twoFactorAuthenticationCode" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_twentyFourId_key" ON "users"("twentyFourId");
