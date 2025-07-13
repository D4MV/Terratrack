/*
  Warnings:

  - Added the required column `fundoId` to the `Terreno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Terreno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Terreno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Terreno" ADD COLUMN     "fundoId" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sueloId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fundoId" TEXT;

-- CreateTable
CREATE TABLE "Suelo" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "caracteristicas" TEXT NOT NULL,

    CONSTRAINT "Suelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "codeSagGrower" TEXT,

    CONSTRAINT "Fundo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "espacio_ancho" DOUBLE PRECISION NOT NULL,
    "espacio_largo" DOUBLE PRECISION NOT NULL,
    "produccion" INTEGER NOT NULL,
    "frecuencia_riego" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Planta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantaProducto" (
    "id_planta" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "circunstancia" TEXT NOT NULL,
    "frecuencia" TEXT NOT NULL,
    "cantidad" TEXT NOT NULL,

    CONSTRAINT "PlantaProducto_pkey" PRIMARY KEY ("id_planta","id_producto")
);

-- CreateTable
CREATE TABLE "PlantaSuelo" (
    "id_planta" TEXT NOT NULL,
    "id_suelo" TEXT NOT NULL,
    "notas_suelo_planta" TEXT NOT NULL,

    CONSTRAINT "PlantaSuelo_pkey" PRIMARY KEY ("id_planta","id_suelo")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "terrenoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "terrenoId" TEXT NOT NULL,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "terrenoId" TEXT,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "terrenoId" TEXT NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidacionRegistro" (
    "id" TEXT NOT NULL,
    "registroTipo" TEXT NOT NULL,
    "registroId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fechaValidacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidacionRegistro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoFactura" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "urlArchivo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fechaSubida" TIMESTAMP(3) NOT NULL,
    "terrenoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DocumentoFactura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlantaToTerreno" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlantaToTerreno_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlantaToTerreno_B_index" ON "_PlantaToTerreno"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_fundoId_fkey" FOREIGN KEY ("fundoId") REFERENCES "Fundo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Terreno" ADD CONSTRAINT "Terreno_fundoId_fkey" FOREIGN KEY ("fundoId") REFERENCES "Fundo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Terreno" ADD CONSTRAINT "Terreno_sueloId_fkey" FOREIGN KEY ("sueloId") REFERENCES "Suelo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantaProducto" ADD CONSTRAINT "PlantaProducto_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "Planta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantaProducto" ADD CONSTRAINT "PlantaProducto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantaSuelo" ADD CONSTRAINT "PlantaSuelo_id_planta_fkey" FOREIGN KEY ("id_planta") REFERENCES "Planta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantaSuelo" ADD CONSTRAINT "PlantaSuelo_id_suelo_fkey" FOREIGN KEY ("id_suelo") REFERENCES "Suelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "Terreno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "Terreno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "Terreno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "Terreno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidacionRegistro" ADD CONSTRAINT "ValidacionRegistro_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoFactura" ADD CONSTRAINT "DocumentoFactura_terrenoId_fkey" FOREIGN KEY ("terrenoId") REFERENCES "Terreno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoFactura" ADD CONSTRAINT "DocumentoFactura_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantaToTerreno" ADD CONSTRAINT "_PlantaToTerreno_A_fkey" FOREIGN KEY ("A") REFERENCES "Planta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlantaToTerreno" ADD CONSTRAINT "_PlantaToTerreno_B_fkey" FOREIGN KEY ("B") REFERENCES "Terreno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
