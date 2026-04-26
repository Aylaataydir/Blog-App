import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import useBlogCall from '../../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SkeletonMyBlogList from '../skeletons/SkeletonMyBlogList'
import { userLikesStatus } from '../../features/blogSlice'

const MyFavoritesList = () => {

    const { getDataByEndpoint } = useBlogCall()
    const { userLikes } = useSelector((state) => state.blog)
    const { currentUser } = useSelector((state) => state.auth)
    const loadingStatus = useSelector(userLikesStatus)

    console.log(userLikes)

    useEffect(() => {
        getDataByEndpoint("blogs", { "sort[createdAt]": "desc", "filter[likes]": currentUser._id }, "userLikes")
    }, [])

    // Yüklenme durumu için skeleton göster
    if (loadingStatus === "idle" || loadingStatus === "loading") {
        return (
            <div className='flex flex-col'>
                <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                    <h2 className='text-base font-semibold font-[Poppins]'>My Favorites</h2>
                    <p className='text-xs opacity-50 mt-1'>Blog posts you have liked</p>
                </div>
                <SkeletonMyBlogList count={3} />
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>My Favorites</h2>
                <p className='text-xs opacity-50 mt-1'>Blog posts you have liked</p>
            </div>
            {userLikes && userLikes.length > 0 ? (
                <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-3">
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
            )}
        </div>
    )
}

export default MyFavoritesList