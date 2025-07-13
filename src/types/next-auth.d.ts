import NextAuth, { type DefaultSession, DefaultUser } from "next-auth"
 
declare module "next-auth" {
  interface Session {
    user: {
      role?: string
      fundoId?: string
    } & DefaultSession["user"]
  }
  interface User extends DefaultUser {
    role?: string
    fundoId?: string
  }
}

declare module "next-auth/jwt" {
    interface JWT{
        role?:string;
    }
}