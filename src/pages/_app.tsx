import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import theme from '../themes/dark'
import {AppPropsWithLayout} from '../types/layout'

function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    )
}

export default App
