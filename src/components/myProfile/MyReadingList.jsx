import React, { useEffect } from 'react'
import { FaBookmark } from 'react-icons/fa'
import useBlogCall from '../../hooks/useBlogCall'
import { useSelector } from 'react-redux'
import { userLikesStatus, userSavesStatus } from '../../features/blogSlice'
import SkeletonMyBlogList from '../skeletons/SkeletonMyBlogList'
import ProfileBlogCard from './ProfileBlogCard'

const MyReadingList = () => {

    const { getDataByEndpoint } = useBlogCall()
    const { userSaves, profilePageUserData } = useSelector((state) => state.blog)
    const { currentUser } = useSelector((state) => state.auth)

    const userSavedBlogs = profilePageUserData?.savedBlogs
    console.log(userSavedBlogs)


    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>My Reading List</h2>
                <p className='text-xs opacity-50 mt-1'>Blog posts you saved to read later</p>
            </div>
            {userSavedBlogs && userSavedBlogs.length > 0 ? (
                <ul className="grid lg:grid-cols-2 gap-3">
                    {userSavedBlogs.map(blog => (
                        <li key={blog?._id} className="flex items-center gap-3 bg-bg-primary/20 hover:bg-bg-primary/80 transition rounded-md px-3 py-2 border border-bg-secondary/10 relative group">
                            <ProfileBlogCard key={blog._id} blog={blog} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                    <FaBookmark className='text-3xl mb-3' />
                    <p className='text-sm'>Your reading list is empty.</p>
                </div>
            )}

        </div>
    )
}

export default MyReadingList