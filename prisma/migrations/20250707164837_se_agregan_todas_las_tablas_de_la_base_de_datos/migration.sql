/*
  Warnings:

  - You are about to drop the column `fundoId` on the `Terreno` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Terreno` table. All the data in the column will be lost.
  - You are about to drop the column `lon` on the `Terreno` table. All the data in the column will be lost.
  - You are about to drop the column `sueloId` on the `Terreno` table. All the data in the column will be lost.
  - You are about to drop the `Actividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Alerta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DocumentoFactura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fundo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlantaProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlantaSuelo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suelo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ValidacionRegistro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlantaToTerreno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_terrenoId_fkey";

-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_userId_fkey";

-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_terrenoId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentoFactura" DROP CONSTRAINT "DocumentoFactura_terrenoId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentoFactura" DROP CONSTRAINT "DocumentoFactura_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlantaProducto" DROP CONSTRAINT "PlantaProducto_id_planta_fkey";

-- DropForeignKey
ALTER TABLE "PlantaProducto" DROP CONSTRAINT "PlantaProducto_id_producto_fkey";

-- DropForeignKey
ALTER TABLE "PlantaSuelo" DROP CONSTRAINT "PlantaSuelo_id_planta_fkey";

-- DropForeignKey
ALTER TABLE "PlantaSuelo" DROP CONSTRAINT "PlantaSuelo_id_suelo_fkey";

-- DropForeignKey
ALTER TABLE "Reporte" DROP CONSTRAINT "Reporte_terrenoId_fkey";

-- DropForeignKey
ALTER TABLE "Reporte" DROP CONSTRAINT "Reporte_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_terrenoId_fkey";

-- DropForeignKey
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_userId_fkey";

-- DropForeignKey
ALTER TABLE "Terreno" DROP CONSTRAINT "Terreno_fundoId_fkey";

-- DropForeignKey
ALTER TABLE "Terreno" DROP CONSTRAINT "Terreno_sueloId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_fundoId_fkey";

-- DropForeignKey
ALTER TABLE "ValidacionRegistro" DROP CONSTRAINT "ValidacionRegistro_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PlantaToTerreno" DROP CONSTRAINT "_PlantaToTerreno_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlantaToTerreno" DROP CONSTRAINT "_PlantaToTerreno_B_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "Terreno" DROP COLUMN "fundoId",
DROP COLUMN "lat",
DROP COLUMN "lon",
DROP COLUMN "sueloId";

-- DropTable
DROP TABLE "Actividad";

-- DropTable
DROP TABLE "Alerta";

-- DropTable
DROP TABLE "DocumentoFactura";

-- DropTable
DROP TABLE "Fundo";

-- DropTable
DROP TABLE "Planta";

-- DropTable
DROP TABLE "PlantaProducto";

-- DropTable
DROP TABLE "PlantaSuelo";

-- DropTable
DROP TABLE "Producto";

-- DropTable
DROP TABLE "Reporte";

-- DropTable
DROP TABLE "Suelo";

-- DropTable
DROP TABLE "Tarea";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "ValidacionRegistro";

-- DropTable
DROP TABLE "_PlantaToTerreno";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nombre" TEXT,
    "email" TEXT,
    "password" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
