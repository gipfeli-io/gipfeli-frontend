import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import AuthService from '../../../services/auth/auth-service'

export default NextAuth({
    pages: {
        signIn: '/login',
    },
    secret: process.env.JWT_SECRET,
    session: {
        maxAge: 60 * 60 // defaults to 1 hour of idle
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }

                const service = new AuthService()
                const res = await service.login(credentials.email, credentials.password)
                const token = await res.json() // Todo: could return object already typed.

                if (res.ok) {
                    return {
                        email: credentials.email,
                        accessToken: token?.access_token
                    }
                }

                return null
            },
        })
    ],
    callbacks: {
        async jwt({token, user, account}) {
            if (account && user) {
                token.accessToken = user.accessToken
            }

            return token
        },
        async session({session, token}) {
            session.accessToken = token.accessToken

            return session
        },
    }
})