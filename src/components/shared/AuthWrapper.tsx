import {useSession} from 'next-auth/react'
import {CircularProgress} from '@mui/material'
import {useRouter} from 'next/router'
import {PropsWithChildren} from 'react'

export const AuthWrapper = ({children}: PropsWithChildren<any>) => {
    const router = useRouter()
    const {status} = useSession({
        required: true, onUnauthenticated: () => {
            router.push('/login').then(r => null)
        }
    })

    if (status === 'loading') {
        return <CircularProgress/>
    }

    if (status === 'authenticated') {
        return <>{children}</>
    }
}