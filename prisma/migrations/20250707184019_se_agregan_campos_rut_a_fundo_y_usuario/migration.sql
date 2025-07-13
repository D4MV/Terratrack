/*
  Warnings:

  - Added the required column `rutFundo` to the `Fundo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rutUsuario` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fundo" ADD COLUMN     "rutFundo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rutUsuario" TEXT NOT NULL;
