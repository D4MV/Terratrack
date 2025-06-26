import { loginSchema } from "@/lib/loginSchema"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        authorize:async(credentials) => {
          const {data, success} = loginSchema.safeParse(credentials);
          
          if(!success) {
            throw new Error("credenciales invalidas")
          }

          //Buscar el usuario en la base de datos

          const user = await prisma.user.findUnique({
            where:{
              email:data.email,
            }
          })

          if(!user || !user.password){
            throw new Error("No has creado ninguna cuenta")
          }
          
          const isValid = await bcrypt.compare(data.password, user.password);            

          if(!isValid){
            throw new Error("Contraseña incorrecta")
          }

          return user
        }
      }),
  ],
} satisfies NextAuthConfig