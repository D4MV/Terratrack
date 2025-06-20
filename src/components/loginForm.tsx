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


const LoginForm = ()=>{
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })

    
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await loginActions(values);
  }

  return (
    <div className="max-w-52">
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
            <Button>signIn</Button>
        </form>
        </Form>
    </div>
  )
};

export default LoginForm