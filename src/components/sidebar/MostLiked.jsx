
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogCall from '../../hooks/useBlogCall'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'


const MostLiked = () => {

  const { getDataByEndpoint } = useBlogCall()

  const { blogs } = useSelector(state => state.blog)
  const { currentUser } = useSelector(state => state.auth)

  const mostLiked = blogs ? [...blogs].sort((a, b) => b.likes.length - a.likes.length).slice(0, 5) : []

  useEffect(() => {
    getDataByEndpoint("blogs")
  }, [])

  return (

    <div>
      <h3 className='bg-bg-secondary text-center py-2 font-semibold text-white mb-6 '>MOST LIKED</h3>
      <div className='flex flex-col ps-2 gap-5'>
        {mostLiked?.map((blog, index) => (
          <Link
            onClick={(e) => { if (!currentUser) { e.preventDefault(); toast.error("Please log in to read this post.") } }}
            to={`/home/blog/${blog._id}`} key={blog._id}
            className='flex items-center gap-3 relative border-b-1 border-b-gray-300/70 pb-3'>
            <p className='absolute bg-bg-primary w-6 h-6 pt-0.5 text-center rounded-full top-0'>{index + 1}</p>
            <img src={blog.image} alt="" className='rounded-full object-cover w-18 h-18' />
            <div>
              <h2 className='line-clamp-2 text-sm font-semibold hover:text-bg-secondary transition-colors duration-200'>{blog.title}</h2>
              <p className='opacity-80'>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: '2-digit', year: 'numeric'
              })}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

export default MostLiked