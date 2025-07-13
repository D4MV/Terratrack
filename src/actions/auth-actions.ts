"use server";

import { loginSchema, RegisterSchema } from "@/lib/loginSchema"
import { z } from "zod"
import { signIn } from "../auth"
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import bcrypt from "bcryptjs";
import { _email } from "zod/v4/core";
import { NextResponse } from "next/server";


export const loginActions = async(
    values: z.infer<typeof loginSchema>
)=>{
    try{
        await signIn("credentials",{
            email:values.email,
            password:values.password,
            redirect:false
        })
        return {success:true}

    }catch(error){
        if(error instanceof AuthError){
            return {error: error.cause?.err?.message};
        }
        console.log(error)
    } 
}

export const RegisterActions = async(
    values: z.infer<typeof RegisterSchema>
)=>{    
    try{
        const {data, success} = RegisterSchema.safeParse(values);
        if(!success){
            return {error:"datos invalidos"}
        }

        const user = await  prisma.user.findUnique({
            where:{
              email:data.email,
        }
        });

        const passwordHash = await bcrypt.hash(data.password, 10)

        if(user){
            return{
                error: "El usuario ya existe"
            }
        }


        const crearFundo = await prisma.fundo.create({
            data:{
                rutFundo:data.rutFundo,
                nombre:data.nombreTerreno,
                direccion:data.direccion
                
            }
        })

        await prisma.user.create({
            data:{
                email:data.email,
                nombre:data.nombre,
                password: passwordHash,
                rutUsuario: data.rutUsuario,
                fundoId: crearFundo.id
            }
        })




        await signIn("credentials", {
            email:data.email,
            nombre: data.nombre,
            redirect:false
            
        })

        return {success:true}

    }catch(error){
        if(error instanceof AuthError){
            return {error: error.cause?.err?.message};
        }
        console.error("Error en registro:", error);
        return {error: "Error interno del servidor. Por favor, inténtalo de nuevo."}
    }
}