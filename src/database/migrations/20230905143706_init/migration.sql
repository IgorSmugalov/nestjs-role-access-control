-- CreateEnum
CREATE TYPE "roles" AS ENUM ('user', 'admin', 'root');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "roles" "roles"[] DEFAULT ARRAY['user']::"roles"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
