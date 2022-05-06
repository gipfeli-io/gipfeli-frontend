import {GetServerSideProps} from 'next'
import LandingPageLayout from '../../layouts/landing-page-layout'
import {getSession} from 'next-auth/react'
import UsersService from '../../services/users/users-service'
import {Session} from 'next-auth'


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session: Session | null = await getSession(context)

    const res = await UsersService.profile(session) // Todo: make sure session is set
    const body = await res.json()

    return {
        props: {
            username: body.username,
            id: body.id
        }
    }
}

const AppHome = ({username, id}: { username: string, id: number }) => {
    return (
        <LandingPageLayout>
            <h1>Username in API: {username}</h1>
            <h2>User ID: {id}</h2>
        </LandingPageLayout>

    )
}

export default AppHome