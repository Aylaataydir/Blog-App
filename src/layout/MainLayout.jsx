


import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import ScrollToTop from '../app/ScrollToTop'


const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout