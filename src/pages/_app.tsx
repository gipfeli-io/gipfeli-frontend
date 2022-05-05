import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import theme from '../themes/dark'
import {SessionProvider} from 'next-auth/react'
import {AppProps} from 'next/app'

function App({Component, pageProps: {session, ...pageProps}} : AppProps) {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    )
}

export default App
