import { z } from "zod";

export const loginSchema = z.object({
    email : z.string({required_error:"Email is required"})
    .email("invalid email")
    .min(1,"email is required"),
    password: z.string({required_error:"password is required"})
    .min(1, "password is required")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(13, "La contraseña no debe tener más de 32 caracteres")
})

export const RegisterSchema = z.object({
    email : z.string({required_error:"Email is required"})
    .email("invalid email")
    .min(1,"email is required"),
    password: z.string({required_error:"password is required"})
    .min(1, "password is required")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(13, "La contraseña no debe tener más de 32 caracteres"),
    nombre : z.string({required_error :"el nombre es requerido"})
    .min(1, "debe ingresar el nombre")
    .max(20, "excedió el máximo de carácteres")

})
