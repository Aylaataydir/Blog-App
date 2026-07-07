import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import BlogList from '../components/BlogList'
import Sidebar from '../components/sidebar/Sidebar'
import MostRead from '../components/MostRead'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import { div } from 'framer-motion/client'
import { Link } from 'react-router-dom'


const Home = () => {

    const { searchedItems } = useSelector(state => state.blog)
    console.log(searchedItems)

    if (searchedItems) {
        if (searchedItems.length > 0) {
            return (
                <div>
                    <ul className='flex flex-col gap-4 w-2xl mt-7 ms-6  '>
                        {
                            searchedItems.map(blog => (
                                <li key={blog._id} className="flex items-center gap-3 bg-bg-primary hover:bg-bg-primary/80 transition rounded-md px-3 py-2  border border-bg-secondary/10">
                                    <Link to={`/blog/${blog._id}`} className="flex items-center gap-3 w-full">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                                        />
                                        <span className="text-sm font-medium text-gray-800 line-clamp-2 hover:underline">
                                            {blog.title}
                                        </span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col items-center justify-center py-16 opacity-60">
                    <span className="text-2xl font-semibold mb-2">No results found</span>
                    <span className="text-base text-gray-500">Try a different search term.</span>
                </div>
            )
        }
    }

    return (

        <div className='max-w-360 mx-auto mt-3'>
            <div className='col-span-4 mx-auto'>
                <Hero />
            </div>
            <div className='mx-auto my-5 mt-12'>
                <MostRead />
            </div>
            <div className='flex flex-col lg:flex-row lg:gap-10 mt-18 px-1 md:px-5 mx-auto'>
                <div className='flex-3 order-2 lg:order-1 lg:border-e lg: border-e-gray-300/80'>
                    <BlogList />
                </div>
                <div className='flex-1 order-1 lg:order-2' >
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