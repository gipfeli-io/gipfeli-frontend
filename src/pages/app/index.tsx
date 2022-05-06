import {GetServerSideProps} from 'next'
import LandingPageLayout from '../../layouts/landing-page-layout'
import {useAuth} from '../../hooks/use-auth'
import {getSession} from 'next-auth/react'


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    console.log(session?.accessToken)
    const res = await fetch(`${process.env.BACKEND_API}/users/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
        },
    })

    const body = await res.json()

    return {
        props: {
            a: 5
        }
    }
}

const AppHome = ({a}: { a: number }) => {
    const {user, isAuthenticated} = useAuth()

    return (
        <LandingPageLayout>
            <h1>{user}</h1>
            <h2>{a}</h2>
        </LandingPageLayout>

    )
}

export default AppHome