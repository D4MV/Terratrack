import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({

        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
            console.log(credentials)
            if(credentials.email !== "test@test.com"){
                throw new Error("invalid credentials");
            }
          
            return {
                id:"1",
                name:"test User",
                email: "test@test.com",
                password:"12312312"

          };
        },
      }),
  ],
} satisfies NextAuthConfig