import {ReactElement, ReactNode} from 'react'
import {AppProps} from 'next/app'
import {NextPage} from 'next'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}