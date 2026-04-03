import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaHeart, FaEye, FaPen, FaBookmark, FaStar } from 'react-icons/fa'

const MyProfileSidebar = ({ activeTab, onTabChange }) => {

    const { currentUser } = useSelector(state => state.auth)
    const { blogs } = useSelector(state => state.blog)

    const userBlogs = blogs?.filter(blog => blog.userId === currentUser?._id || blog.userId?._id === currentUser?._id) || []
    const totalLikes = userBlogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0)

    const tabs = [
        { key: 'blogs', label: 'My Blogs', icon: <FaPen className='text-xs' /> },
        { key: 'reading', label: 'My Reading List', icon: <FaBookmark className='text-xs' /> },
        { key: 'favorites', label: 'My Favorites', icon: <FaStar className='text-xs' /> },
    ]

    return (
        <div className='flex flex-col gap-3 relative'>
            {/* Profile Card */}
            <div className='bg-bg-primary rounded-sm overflow-hidden'>
                <div className=' border-b border-b-bg-secondary/50 h-16' />
                <div className='flex flex-col items-center -mt-10 pb-5 px-5'>
                    <div className="avatar">
                        <div className="w-20 rounded-full ring-2 ring-bg-secondary ring-offset-2 ring-offset-bg-primary">
                            <FaPen className='absolute -top-3 -right-20 opacity-50 cursor-pointer ' />
                            <img src={currentUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                        </div>
                    </div>
                    <h3 className='font-semibold font-[Poppins] text-base mt-3'>{currentUser?.username}</h3>
                    <p className='text-xs opacity-60'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-1'>
                <div className='bg-bg-primary rounded-sm p-4 flex flex-col items-center gap-1'>
                    <FaPen className='text-bg-secondary text-sm' />
                    <p className='font-semibold font-[Poppins] text-lg'>{userBlogs.length}</p>
                    <p className='text-[10px] uppercase tracking-wider opacity-50 font-medium'>Blogs</p>
                </div>
                <div className='bg-bg-primary rounded-sm p-4 flex flex-col items-center gap-1'>
                    <FaHeart className='text-red-400 text-sm' />
                    <p className='font-semibold font-[Poppins] text-lg'>{totalLikes}</p>
                    <p className='text-[10px] uppercase tracking-wider opacity-50 font-medium'>Likes</p>
                </div>
            </div>

       
            <div>
                {/* <h3 className='bg-bg-secondary text-center py-2 font-semibold text-white text-xs tracking-wide'>NAVIGATION</h3> */}
                <div className='flex flex-col gap-1'>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => onTabChange?.(tab.key)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-medium transition-colors duration-200 cursor-pointer
                                ${activeTab === tab.key
                                    ? 'bg-bg-btn-2 text-gray-800'
                                    : 'bg-bg-primary/60 text-gray-600 hover:bg-bg-primary'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyProfileSidebar