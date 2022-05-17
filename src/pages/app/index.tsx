import {NextPageContext} from 'next'
import UsersService from '../../services/users/users-service'
import {withAuthenticatedOrRedirect} from '../../utils/with-authenticated-or-redirect'
import {Session} from 'next-auth'
import AppPageLayout from '../../layouts/app-page-layout'

type AppHomeProps = {
    username: string
    id: number
}

export const getServerSideProps = (context: NextPageContext) => withAuthenticatedOrRedirect(context, async (context: NextPageContext, session: Session) => {
    const service = new UsersService(session)
    const res = await service.profile()
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
        <AppPageLayout>
            <h1>Username in API: {username}</h1>
            <h2>User ID: {id}</h2>
        </AppPageLayout>

    )
}

export default AppHome