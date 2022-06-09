-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "twentyFourId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "login" TEXT,
    "name" TEXT,
    "last_name" TEXT,
    "first_name" TEXT,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "image_url" TEXT,
    "avatarUrl" TEXT,
    "test" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_twentyFourId_key" ON "users"("twentyFourId");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
