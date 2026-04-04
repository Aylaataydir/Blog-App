import React, { useEffect } from 'react'
import useBlogCall from '../../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import SmallBlogCard from '../SmallBlogCard'
import { div } from 'framer-motion/client'
import { Link } from 'react-router-dom'

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
                    <Link to={`/blog/${blog._id}`}  key={blog._id}>
                        <SmallBlogCard blog={blog} />
                    </Link>
                )) : (
                    <p className='text-sm opacity-40 '>You haven't published any blogs yet.</p>
                )}
            </div>
        </div>
    )
}

export default MyBlogsList