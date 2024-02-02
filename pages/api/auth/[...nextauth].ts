import { SupabaseAdapter } from '@auth/supabase-adapter'
import jwt from 'jsonwebtoken'
import env from 'lib/env'
import { NextAuthOptions, Session } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import NextAuth from 'next-auth/next'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

// import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: env.googleClientId,
			clientSecret: env.googleClientSecret
		}),
		FacebookProvider({
			clientId: env.facebookClientId,
			clientSecret: env.facebookClientSecret
			// userinfo: 'me?fields=id,name,email,picture{url}'
			// userinfo: 'me?fields=id,name,email,picture',
			// profile(profile) {
			// 	return {
			// 		id: profile.id,
			// 		name: profile.name,
			// 		email: profile.email,
			// 		image: profile.picture.data.url
			// 	}
			// }
		})
	],
	// ...

	adapter: SupabaseAdapter({
		url: env.nextPublicSupabaseUrl,
		secret: env.supabaseServiceRoleKey
	}) as Adapter,
	callbacks: {
		async session({ session, user }) {
			if (session?.user) {
				// console.log('session', { session })
				// console.log('user', { user })
				// session.user.id = user.id
				// session.user.role = user.role
				session.user = {
					...session.user,
					// email: user.email,
					id: user.id,
					role: (user as unknown as { role: string }).role
				} as unknown as Session['user']
			}
			const signingSecret = env.supabaseJwtSecret
			if (signingSecret) {
				const payload = {
					aud: 'authenticated',
					exp: Math.floor(new Date(session.expires).getTime() / 1000),
					sub: user.id,
					email: user.email
				}
				session.supabaseAccessToken = jwt.sign(payload, signingSecret)
			}

			return session
		}
	}
}

export default NextAuth(authOptions)
