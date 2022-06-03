import React from 'react'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/pages/Home'
import LandingPageLayout from './components/pages/layouts/LandingPageLayout'
import dark from './themes/dark'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AuthPageLayout from './components/pages/layouts/AuthPageLayout'
import Login from './components/pages/Login'
import AuthenticationProvider from './components/auth/AuthenticationProvider'
import RequireAuth from './components/auth/RequireAuth'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <ThemeProvider theme={dark}>
          <CssBaseline/>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LandingPageLayout />}>
                      <Route index element={<Home/>}/>
                    <Route path="/protected" element={<RequireAuth><Home/></RequireAuth>}/>
                  </Route>
                  <Route path="/" element={<AuthPageLayout/>}>
                      <Route path="login" element={<Login/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </AuthenticationProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
