"use client"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { auth } from "../../auth"


export default function SignInButton async()  {
  const session = await auth();
  return (
    <Button onClick={() => signIn("session",{ redirectTo: "/dashboard" })}>
      Sign In
    </Button>
  )
}

