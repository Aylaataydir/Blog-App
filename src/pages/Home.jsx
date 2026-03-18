import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import Sidebar from '../components/sidebar/sidebar'

const Home = () => {
    return (
        <div className='grid grid-cols-4 gap-8 mx-10'>
            <div className='col-span-4'>
                <Hero />
            </div>
            <div className='col-span-3'>
                <BlogList/>
            </div>
            <div >
                <Sidebar/>
            </div>

        </div>
    )
}

export default Home