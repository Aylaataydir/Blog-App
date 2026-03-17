import React, { useEffect } from 'react'
import useBlogCall from '../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import { blogSlice } from '../features/blogSlice'
import BlogCard from './BlogCard'

const BlogList = () => {

    const { getDataByEndpoint } = useBlogCall()
    const { blogs, categories } = useSelector((state) => state.blog)

    console.log(blogs)
   

    useEffect(() => {
        getDataByEndpoint("blogs")
        getDataByEndpoint("categories")
    }, [])



    return (
        <div className='grid grid-cols-2 gap-6'>
            {blogs?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}

        </div>
    )
}

export default BlogList