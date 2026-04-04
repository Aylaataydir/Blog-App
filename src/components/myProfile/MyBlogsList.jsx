import React, { useEffect } from 'react'
import useBlogCall from '../../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import SmallBlogCard from '../SmallBlogCard'
import { div } from 'framer-motion/client'
import { Link } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'

const MyBlogsList = () => {

    const { getDataByEndpoint } = useBlogCall()
    const { blogs } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    console.log(blogs)

    const myBlogs = blogs?.filter(blog => blog.userId === currentUser._id)
    console.log(myBlogs)

    useEffect(() => {

        getDataByEndpoint("blogs", { "sort[createdAt]": "desc" }, "blogs")

    }, [])

    return (
        <div className='flex flex-col '>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold  font-[Poppins]'>My Blogs</h2>
                <p className='text-xs opacity-50 mt-1'>All blog posts you have published</p>
            </div>
            <div className='flex '>
                {myBlogs?.length > 0 ? myBlogs.map(blog => (
                    <div key={blog._id} className='relative group'>
                        <Link to={`/blog/${blog._id}`}>
                            <SmallBlogCard blog={blog} />
                        </Link>
                        <button onClick={() => document.getElementById('my_modal_7').showModal()} className='absolute top-2 right-2 z-10 p-1.5 text-gray-700 text-xs rounded-full cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all'>
                            <FaPen />
                        </button>
                    </div>
                )) : (
                    <p className='text-sm opacity-40 '>You haven't published any blogs yet.</p>
                )}
            </div>
        </div>
    )
}

export default MyBlogsList