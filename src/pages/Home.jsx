import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import Sidebar from '../components/sidebar/sidebar'
import MostRead from '../components/MostRead'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'


const Home = () => {

    const { isSearching } = useSelector(state => state.blog)

    return (

        <div className='max-w-[1440px] mx-auto'>

            {!isSearching &&
                <>
                    <div className='col-span-4 mx-auto'>
                        <Hero />
                    </div>
                    <div className='mx-auto my-5 mt-12'>
                        <MostRead />
                    </div>
                </>

            }
            <div className='flex gap-10 mt-18 px-5 mx-auto'>
                <div className='flex-1 border-e border-e-gray-300/80'>
                    <BlogList />
                </div>
                <div className='' >
                    <Sidebar />
                </div>
            </div>
            <div className='mt-3 '>
                <Footer />
            </div>

        </div>
    )
}

export default Home