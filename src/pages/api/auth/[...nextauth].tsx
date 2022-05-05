import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// @ts-ignore
export default NextAuth({
    pages: {
        signIn: '/app/login',
    },
    secret: process.env.JWT_SECRET,
    providers: [
        CredentialsProvider( {
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // @Todo Implement logic to check in api
                if (!credentials) {
                    return null;
                }

                if (credentials.email === 'admin@gipfeli.io' && credentials.password === 'admin') {
                    console.log('success')
                    return {
                        id: 1,
                        uid: 1,
                        name: 'admin',
                        email: 'admin@dreipol.ch',
                    }
                }
                return null
            }
        } )
    ]
})