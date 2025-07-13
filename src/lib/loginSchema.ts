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
    .max(20, "excedió el máximo de carácteres"),
    rutUsuario: z.string({required_error: "El RUT del usuario es requerido"})
      .min(8, "El RUT debe tener al menos 8 caracteres")
      .max(12, "El RUT no debe exceder 12 caracteres"),
    rutFundo: z.string({required_error: "El RUT del fundo es requerido"})
      .min(8, "El RUT debe tener al menos 8 caracteres")
      .max(12, "El RUT no debe exceder 12 caracteres"),
    nombreTerreno: z.string({required_error: "El nombre del terreno es requerido"})
      .min(1, "Debe ingresar el nombre del terreno")
      .max(30, "El nombre del terreno no debe exceder 30 caracteres"),
    direccion: z.string({required_error:"debe ingresar una dirección"})
})
