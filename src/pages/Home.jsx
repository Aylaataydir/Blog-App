import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'

const Home = () => {
    return (
        <div>
            <div>
                <Hero />
            </div>
            <div>
                <BlogList/>
            </div>

        </div>
    )
}

export default Home