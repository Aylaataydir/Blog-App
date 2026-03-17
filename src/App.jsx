
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import MainLayout from './layout/MainLayout'
import Register from './pages/Register'
import { router } from './app/router'
import { Provider } from 'react-redux'
import { persistor, store } from './app/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </PersistGate>
    </Provider>
  )
}

export default App
