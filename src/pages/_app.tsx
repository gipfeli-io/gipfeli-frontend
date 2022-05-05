import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import theme from '../themes/dark'
import {AppPropsWithLayout} from '../types/layout'
import {SessionProvider} from 'next-auth/react'

function App({Component, pageProps: {session, ...pageProps}}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SessionProvider session={session}>
                {getLayout(
                    <Component {...pageProps} />
                )}
            </SessionProvider>
        </ThemeProvider>
    )
}

export default App
