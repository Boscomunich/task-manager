import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/themeprovider';
import Home from './pages/home';
import Layout from './pages/layout';
import Signup from './pages/signup';
import Signin from './pages/signin';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import DashBoard from './pages/dashboard';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import ApolloSetup from './apollosetup';
import Board from './pages/board';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const authHeader = useAuthHeader()

  const isAuthenticated = useIsAuthenticated();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ApolloSetup token={authHeader}>
        <BrowserRouter>
        <ToastContainer />
          <Routes>
            <Route path='/' element={isAuthenticated ? <Navigate to='/dashboard'/> : <Layout/>}>
              <Route index element={<Home/>}/>
            </Route>
            <Route path='/login' element={<Signin/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route element={<AuthOutlet fallbackPath='/login' />}>
              <Route path='/dashboard' element={<DashBoard/>}/>
              <Route path='/dashboard/:id' element={<Board/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        </ApolloSetup>
    </ThemeProvider>
  )
}

export default App