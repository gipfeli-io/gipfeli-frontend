import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import theme from '../themes/dark'
import {SessionProvider} from 'next-auth/react'
import {AppProps} from 'next/app'
import Head from 'next/head'
import 'reflect-metadata' // todo: use webpack injector for global scoping

function App({Component, pageProps: {session, ...pageProps}}: AppProps) {

    // Todo: add a generic means to check if a user may access the page - but we need it in severside props, so...
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <meta name='viewport' content='initial-scale=1, width=device-width'/>
            </Head>
            <CssBaseline/>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    )
}

export default App
