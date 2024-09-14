import {BrowserRouter, Routes, Route } from 'react-router-dom'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { ThemeProvider } from './components/themeprovider';
import Home from './pages/home';
import Layout from './pages/layout';

function App() {

  const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App