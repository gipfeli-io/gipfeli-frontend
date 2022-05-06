import {NextPageContext} from 'next'
import LandingPageLayout from '../../layouts/landing-page-layout'
import UsersService from '../../services/users/users-service'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'

type AppHomeProps = {
    username: string
    id: number
}

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    const res = await UsersService.profile(session)
    const body = await res.json()

    return {
        props: {
            username: body.username,
            id: body.id
        }
    }
})

const AppHome = ({username, id}: AppHomeProps) => {
    return (
        <LandingPageLayout>
            <h1>Username in API: {username}</h1>
            <h2>User ID: {id}</h2>
        </LandingPageLayout>

    )
}

export default AppHome