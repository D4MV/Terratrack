import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req:NextRequest, res:NextResponse){

    try{
        const fundos = await prisma.fundo.findMany({
            select:{
                id:true,
                nombre:true
            }
        })
        console.log(fundos)
        return NextResponse.json(fundos)
    }catch(error){
        return NextResponse.json({error:"Error al obtener los fundos"}, {status:500})
    }
}