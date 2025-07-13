import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req:NextRequest, res:NextResponse){

    const session = await auth();

    if(!session || !session.user || !session.user.fundoId){
        return NextResponse.json({message:"No autorizado o Fundo no asignado."}, {status:401})
    }

    const {areaHectareas, lat, lon} = await req.json()

    try{

        const terreno = await prisma.terreno.create({
            data:{  
                areaHectareas:parseFloat(areaHectareas),
                lat:lat,
                lon:lon,
                fundoId:session.user.fundoId,
                }
            })

        console.log(terreno)
        return NextResponse.json(terreno, { status: 201 });
    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
    }
    console.log(res)

}

export async function GET() {
    const session = await auth();

    if(!session || !session.user || !session.user.fundoId){
        return NextResponse.json({message:"No autorizado o Fundo no asignado."}, {status:401})
    }

    const currentFundoId = session.user.fundoId

    const poligonos = await prisma.terreno.findMany();
    return NextResponse.json(poligonos);
  }