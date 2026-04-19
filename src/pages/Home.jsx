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

        <div className='max-w-360 mx-auto mt-3'>

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
            <div className='mt-20 mb-30 '>
                <div className="italic text-2xl md:text-4xl font-semibold text-[#7c6f57] text-center  tracking-[0.6px] leading-relaxed">
                    <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none">“</span>
                    <span style={{ fontFamily: 'Caveat, cursive' }}>Your thoughts deserve to be heard.</span>
                    <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none"> ”</span>
                </div>
                <div className="text-base md:text-lg text-[#a58d6f] text-center font-normal max-w-md italic font-pinyon mx-auto">
                    Write, share, and discover your community here.
                </div>
            </div>
        </div>
    )
}

export default Home