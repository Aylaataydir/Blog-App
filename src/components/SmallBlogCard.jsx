import React, { useEffect } from 'react'
import { FaEye } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useBlogCall from '../hooks/useBlogCall'

const SmallBlogCard = ({ blog }) => {

    const { categories } = useSelector(state => state.blog)
    const { getDataByEndpoint } = useBlogCall()

    const category = categories?.find(cat => cat._id === blog.categoryId)

    useEffect(() => {
        getDataByEndpoint("categories")
    }, [])


    return (
        <div
        className="cursor-pointer h-45 flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-45 sm:w-45 mx-auto mb-2">
            <figure className='relative'>
                <img
                    className='w-full h-25 object-cover'
                    src={blog.image}
                    alt="" />
                <span className='absolute top-2 left-2 bg-bg-secondary/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide'>
                    {category?.name ?? 'Other'}
                </span>
            </figure>
            <div className="flex flex-1 flex-col p-3">
                <h2 className="text-x font-semibold leading-snug line-clamp-2 mb-1">{blog.title}</h2>
                <div className='flex justify-between items-center mt-auto '>
                    <p className='text-xs text-gray-400'>
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: '2-digit', year: 'numeric'
                        })}
                    </p>
                    <div className='flex items-center gap-1'>
                        <FaEye className='text-[10px] opacity-30' />
                        <p className='text-xs text-gray-400'>{blog.countOfVisitors}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SmallBlogCard