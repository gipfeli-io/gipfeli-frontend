import React from 'react'
import 'reflect-metadata'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import MainLayout from './components/pages/layouts/MainLayout'
import AuthPageLayout from './components/pages/layouts/AuthPageLayout'
import Login from './components/pages/Login'
import AuthenticationProvider from './components/providers/AuthenticationProvider'
import AppPageLayout from './components/pages/layouts/AppPageLayout'
import ToursOverview from './components/pages/tours/ToursOverview'
import TourCreate from './components/pages/tours/TourCreate'
import TourDetail from './components/pages/tours/TourDetail'
import TourEdit from './components/pages/tours/TourEdit'
import { Navigate } from 'react-router'
import NotFound from './components/pages/NotFound'
import NotificationProvider from './components/providers/NotificationProvider'
import SwitchableThemeProvider from './components/providers/SwitchableThemeProvider'
import ErrorBoundary from './components/shared/ErrorBoundary'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <SwitchableThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<MainLayout/>}>
                  <Route index element={<Home/>}/>
                  <Route path="tours" element={<AppPageLayout/>}>
                    <Route index element={<ToursOverview/>}/>
                    <Route path="create" element={<TourCreate/>}/>
                    <Route path=":id/edit" element={<TourEdit/>}/>
                    <Route path=":id" element={<TourDetail/>}/>
                  </Route>
                </Route>
                <Route path="/" element={<AuthPageLayout/>}>
                  <Route path="login" element={<Login/>}/>
                </Route>
                <Route path="404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/404" replace/>}/>
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </NotificationProvider>
      </SwitchableThemeProvider>
    </AuthenticationProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
