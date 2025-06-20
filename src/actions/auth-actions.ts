"use server";

import { loginSchema } from "@/lib/loginSchema"
import { z } from "zod"
import { signIn } from "../../auth"
import { AuthError } from "next-auth";
import { success } from "zod/v4-mini";

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