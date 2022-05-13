import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import {Session} from 'next-auth'
import NavBarUserSection from '../../../src/components/shared/NavBarUserSection'
import {SessionProvider} from 'next-auth/react'
import {render} from '@testing-library/react'


/**
 * Todo: Replace <SessionProvider> wrappers with jest.mock('next-auth') and mock useSession() hook
 * Currently, there is a bug preventing us from utilizing jest's mock capacities. Ideally, we would mock the
 * useSession() hook from next-auth and return a fake session from there. However, due to a sub-dependency not having
 * correct syntax, jest fails because it cannot transform it properly. However, it seems to be an issue with newer
 * next and next-auth versions, so it might be fixed. Since we do not have lots of components with useSession() hook,
 * code duplication is not that bad.
 */
describe('NavBarUserSection', () => {
    const mockSession: Session = {
        expires: '1',
        user: {email: 'test@gipfeli.io'},
        accessToken: 'asd'
    }

    it('behaves consistently when logged in', () => {
        const tree = renderer
            .create(<SessionProvider session={mockSession}><NavBarUserSection></NavBarUserSection></SessionProvider>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('behaves consistently when not logged in', () => {
        const tree = renderer
            .create(<SessionProvider><NavBarUserSection></NavBarUserSection></SessionProvider>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('shows login button if not logged in', async () => {
        const {container} = render(
            <SessionProvider><NavBarUserSection></NavBarUserSection></SessionProvider>
        )

        const joinButton = container.querySelector('#join-button')
        const logoutButton = container.querySelector('#logout-button')

        expect(joinButton).toBeInTheDocument()
        expect(logoutButton).not.toBeInTheDocument()
    })

    it('shows logout button and name of user if logged in', async () => {
        const {container, queryByText} = render(
            <SessionProvider session={mockSession}><NavBarUserSection></NavBarUserSection></SessionProvider>
        )

        const logoutButton = container.querySelector('#logout-button')
        const joinButton = container.querySelector('#join-button')
        const greeting = queryByText(mockSession.user.email!, {exact: false})

        expect(logoutButton).toBeInTheDocument()
        expect(joinButton).not.toBeInTheDocument()
        expect(greeting).toBeInTheDocument()
    })
})