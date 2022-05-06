import {NextPageContext} from 'next'
import LandingPageLayout from '../../layouts/landing-page-layout'
import UsersService from '../../services/users/users-service'
import {getSession} from 'next-auth/react'

type AppHomeProps = {
    username: string
    id: number
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)
    const isUser = !!session?.user

    // No authenticated session
    if (!isUser) {
        return {
            redirect: {
                permanent: false,
                destination: 'app/login'
            }
        }
    }

    const res = await UsersService.profile(session)
    const body = await res.json()

    return {
        props: {
            username: body.username,
            id: body.id
        }
    }
}


const AppHome = ({username, id}: AppHomeProps) => {
    return (
        <LandingPageLayout>
            <h1>Username in API: {username}</h1>
            <h2>User ID: {id}</h2>
        </LandingPageLayout>

    )
}

export default AppHome