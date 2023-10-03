// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { SupabaseAdapter } from "@auth/supabase-adapter"
// import jwt from "jsonwebtoken"
// import env from "lib/env";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: env.googleClientId,
//       clientSecret: env.googleClientSecret,
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: env.nextPublicSupabaseUrl,
//     secret: env.supabaseServiceRoleKey,
//   }),
//   //   callbacks: {
//   //   async session({ session, user }: any) {

//   //     const signingSecret = env.supabaseJwtSecret
//   //     if (signingSecret) {
//   //       const payload = {
//   //         aud: "authenticated",
//   //         exp: Math.floor(new Date(session.expires).getTime() / 1000),
//   //         sub: user.id,
//   //         email: user.email,
//   //         role: "authenticated",
//   //       }
//   //       session.supabaseAccessToken = jwt.sign(payload, signingSecret)
//   //     }
//   //     return session
//   //   },
//   // },
// };
// /* @ts-ignore */
// export default NextAuth(authOptions);


import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken"
import env from "lib/env";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    }),
  ],
  /* @ts-ignore */
  adapter: SupabaseAdapter({
    url: env.nextPublicSupabaseUrl,
    secret: env.supabaseServiceRoleKey,
  }),
    callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
        //session.user.role = user.role;
      }
      const signingSecret = env.supabaseJwtSecret
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  },
};

export default NextAuth(authOptions);
