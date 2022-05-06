import {DefaultSession} from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {} & DefaultSession['user']
        accessToken: string
    }

    interface User {
        email: string,
        accessToken: string
    }
}


declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        accessToken: string
    }
}