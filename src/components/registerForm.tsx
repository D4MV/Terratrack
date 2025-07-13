"use client";
import { RegisterSchema } from "@/lib/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";  
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input";
import { RegisterActions } from "@/actions/auth-actions";
import { useState, useTransition, useEffect } from "react";
import { useRouter}  from "next/navigation";

const RegisterForm = ()=>{

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTranstion] = useTransition() 
    const router = useRouter();
    
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          email: "",
          nombre: "",
          rutUsuario: "",
          rutFundo: "",
          nombreTerreno: "",
          direccion:"",
          password:""
        },
      })

    
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError(null);
    startTranstion( async() =>{
      const response = await RegisterActions(values);
      if(response?.error){
        setError(response.error)
      }else{
        router.push("/dashboard")
      }
    })
  }

  return (
    <div className="max-w-52">
        <h1>Register</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
                <FormItem>
                <FormLabel>nombre</FormLabel>
                <FormControl>
                    <Input placeholder="nombre" type="text" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="rutUsuario"
            render={({ field }) => (
                <FormItem>
                <FormLabel>RUT del Usuario</FormLabel>
                <FormControl>
                    <Input placeholder="RUT del Usuario" type="text" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="rutFundo"
            render={({ field }) => (
                <FormItem>
                <FormLabel>RUT del Fundo</FormLabel>
                <FormControl>
                    <Input placeholder="RUT del Fundo" type="text" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="nombreTerreno"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nombre del Terreno</FormLabel>
                <FormControl>
                    <Input placeholder="Nombre del Terreno" type="text" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
                <FormItem>
                <FormLabel>dirección</FormLabel>
                <FormControl>
                    <Input placeholder="dirección" type="text"{...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                    <Input placeholder="password" type="password"{...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <Button
              type="submit"
              disabled={isPending}
            >
                signIn
            </Button>
        </form>
        </Form>
    </div>
  )
};

export default RegisterForm