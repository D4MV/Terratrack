import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { prisma } from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  ...authConfig,  
  session: {strategy:"jwt"},
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.role = user.role

        const prismaUser = await prisma.user.findUnique({
          where: {id: user.id},
          select: {fundoId: true, role:true},
        });
        token.fundoId = prismaUser?.fundoId;
        token.role = prismaUser?.role;
      }
      return token
    },
    async session({ session, token }) {
      if(session.user){
        session.user.role = token.role as string
      }
      if(token){
        session.user.id = token.id as string;
        session.user.fundoId = token.fundoId as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session
    },
  },
})