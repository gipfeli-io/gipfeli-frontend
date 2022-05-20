import {useSession} from 'next-auth/react'
import {CircularProgress} from '@mui/material'
import {useRouter} from 'next/router'

export const AuthWrapper = (children: JSX.Element) => {
    const router = useRouter()
    const {status} = useSession({
        required: true, onUnauthenticated: () => {
            router.push('/login')
            return null
        }
    })

    if (status === 'loading') {
        return <CircularProgress/>
    }

    return <>{children}</>
}