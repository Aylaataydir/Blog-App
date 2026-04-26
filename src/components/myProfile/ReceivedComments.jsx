import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogCall from '../../hooks/useBlogCall'

const ReceivedComments = () => {

    const { userReceivedComments } = useSelector(state => state.blog)
    const {getDataByEndpoint} = useBlogCall()

    console.log(userReceivedComments)


    useEffect(() => {
            getDataByEndpoint("comments", { "sort[createdAt]": "desc" }, "userReceivedComments")
        }, [])


    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>Received Comments</h2>
                <p className='text-xs opacity-50 mt-1'>Comments received on your blog posts</p>
            </div>
            {/* {userLikes && userLikes.length > 0 ? (
                <ul className="grid grid-cols-3 gap-3">
                    {userLikes.map(blog => (
                        <li key={blog._id} className="flex items-center gap-3 bg-bg-primary/20 hover:bg-bg-primary/80 transition rounded-md px-3 py-2  border border-bg-secondary/10">
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
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                    <FaStar className='text-3xl mb-3' />
                    <p className='text-sm'>No favorites yet.</p>
                </div>
            )} */}
        </div>

    )
}

export default ReceivedComments