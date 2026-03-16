
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import MainLayout from './layout/MainLayout'
import Register from './pages/Register'
import { router } from './app/router'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
