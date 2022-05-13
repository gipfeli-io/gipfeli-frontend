import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import useSession, {Session} from 'next-auth'

import NavBarUserSection from '../../../src/components/shared/NavBarUserSection'
import { SessionProvider } from 'next-auth/react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'




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
        );

        const joinButton = container.querySelector('#join-button')
        const logoutButton = container.querySelector('#logout-button')

        expect(joinButton).toBeInTheDocument()
        expect(logoutButton).not.toBeInTheDocument()
    })

    it('shows logout button and name of user if logged in', async () => {
        const {container, queryByText} = render(
            <SessionProvider session={mockSession}><NavBarUserSection></NavBarUserSection></SessionProvider>
        );

        const logoutButton = container.querySelector('#logout-button')
        const joinButton = container.querySelector('#join-button')
        const greeting = queryByText(mockSession.user.email!, {exact: false})

        expect(logoutButton).toBeInTheDocument()
        expect(joinButton).not.toBeInTheDocument()
        expect(greeting).toBeInTheDocument()
    })
})