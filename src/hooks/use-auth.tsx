import {useSession} from 'next-auth/react'
import {useMemo} from 'react'

export const useAuth = () => {
    const session = useSession()

    const isAuthenticated = useMemo(() => {
        if (session.status === 'loading') {
            return false
        }

        return session.status === 'authenticated'

    }, [session.status])

    const user = useMemo(() => session.data?.user, [session.data])

    return {
        isAuthenticated,
        user,
    }
}