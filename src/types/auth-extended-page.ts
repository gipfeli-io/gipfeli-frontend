import {NextComponentType, NextPage, NextPageContext} from 'next'
import {AppProps} from 'next/app'

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
    isPublic?: boolean
};

export type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> & Partial<NextPageWithAuth>

export type ExtendedAppProps<P = {}> = AppProps<P> & {
    Component: NextComponentWithAuth
};