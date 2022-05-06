import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    pages: {
        signIn: '/app/login',
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

                if (credentials.email === 'admin@gipfeli.io' && credentials.password === 'admin') {
                    const res = await fetch(`${process.env.BACKEND_API}/auth/login`, {
                        method: 'POST',
                        body: JSON.stringify({username: 'john@gipfeli.io', password: '1234'}),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    const token = await res.json()

                    return {
                        email: credentials.email,
                        access_token: token?.access_token
                    }
                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({token, user, account}) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.access_token,
                }
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken

            return session;
        },
    }
})