


import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import ScrollToTop from '../app/ScrollToTop'


const MainLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <div className=''>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout