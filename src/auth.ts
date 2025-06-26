import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  ...authConfig,  
  session: {strategy:"jwt"},
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if(session.user){
        session.user.role = token.role as string
      }
      return session
    },
  },
})