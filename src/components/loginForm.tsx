"use client";
import { loginSchema } from "@/lib/loginSchema";
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
import { loginActions } from "@/actions/auth-actions";
import { useState, useTransition } from "react";
import { useRouter}  from "next/navigation";

const LoginForm = ()=>{

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTranstion] = useTransition() 
    const router = useRouter();
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })

    
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTranstion( async() =>{
      const response = await loginActions(values);
      if(response?.error){
        setError(response.error)
      }else{
        router.push("/dashboard")
      }
    })
  }

  return (
    <div className="max-w-52  ">
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

export default LoginForm