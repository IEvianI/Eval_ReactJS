import { NextUIProvider } from '@nextui-org/react'
import Header from './components/header/Header'
import { AuthProvider } from './contexts/authContext.jsx'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PanierProvider } from './components/panier/ContextPanier.jsx'

function App () {
  return (
    <>
      <NextUIProvider>
        <PanierProvider>
          <AuthProvider>
            <Header />
            <Router />
            <ToastContainer />
          </AuthProvider>
        </PanierProvider>
      </NextUIProvider>
    </>
  )
}

export default App
