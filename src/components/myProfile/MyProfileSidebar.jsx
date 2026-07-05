import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaHeart, FaEye, FaPen, FaBookmark, FaStar, FaPlusCircle } from 'react-icons/fa'
import { BiSolidComment } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import UserUpdateModal from '../modals/UserUpdateModal'
import useBlogCall from '../../hooks/useBlogCall'

const MyProfileSidebar = () => {

    const { currentUser } = useSelector(state => state.auth)
    const [imagePreview, setImagePreview] = useState("")
    const { userBlogs } = useSelector(state => state.blog)
    const { getDataByEndpoint } = useBlogCall()


    // const myBlogs = (blogs ?? []).filter(blog => blog.userId === currentUser?._id)

    const countLikes = userBlogs?.reduce((sum, blog) => sum + Number(blog.likes.length), 0)
    const countVisitors = userBlogs?.reduce((sum, blog) => sum + blog.countOfVisitors, 0)

    useEffect(() => {
        getDataByEndpoint("blogs", { "sort[createdAt]": "desc", "filter[userId]": currentUser._id }, "userBlogs")
    }, [])

    const tabs = [
        { key: 'my-blogs', label: 'My Blogs', icon: <FaPen className='text-xs' /> },
        { key: 'my-reading-list', label: 'My Reading List', icon: <FaBookmark className='text-xs' /> },
        { key: 'my-favorites', label: 'My Favorites', icon: <FaStar className='text-xs' /> },
        // { key: 'received-comments', label: 'Received Comments', icon: <BiSolidComment className='text-xs' /> },
    ]

    return (
        <div className='flex flex-col gap-3 sticky top-6 self-start'>
            {/* Profile Card */}
            <div className='bg-bg-primary rounded-sm overflow-hidden '>
                <div className=' border-b border-b-bg-secondary/50 h-16' />
                <div className='flex flex-col items-center -mt-10 pb-5 px-5'>
                    <div className="avatar">
                        <div className="w-24 rounded-full ring-2 ring-bg-secondary ring-offset-2 ring-offset-bg-primary">
                            <img src={imagePreview ? imagePreview : currentUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                        </div>
                    </div>
                    <div className='flex items-center relative '>
                        <h3 className='font-semibold font-[Poppins] text-base mt-3'>{currentUser?.username}</h3>
                        <FaPen onClick={() => document.getElementById('my_modal_6').showModal()} className='opacity-70 cursor-pointer absolute -right-5 top-3' />
                    </div>

                    <p className='text-xs opacity-60'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-1'>
                <div className='bg-bg-primary rounded-sm p-4 flex flex-col items-center gap-1'>
                    <FaPen className='text-bg-secondary text-sm' />
                    <p className='font-semibold font-[Poppins] text-lg'>{userBlogs?.length ?? 0}</p>
                    <p className='text-[10px] uppercase tracking-wider opacity-50 font-medium'>Blogs</p>
                </div>
                <div className='bg-bg-primary rounded-sm p-4 flex flex-col items-center gap-1'>
                    <FaHeart className='text-red-400 text-sm' />
                    <p className='font-semibold font-[Poppins] text-lg'>{countLikes}</p>
                    <p className='text-[10px] uppercase tracking-wider opacity-50 font-medium'>Likes</p>
                </div>
                <div className='bg-bg-primary rounded-sm p-4 flex flex-col items-center gap-1'>
                    <FaEye className='text-bg-btn text-sm' />
                    <p className='font-semibold font-[Poppins] text-lg'>{countVisitors}</p>
                    <p className='text-[10px] uppercase tracking-wider opacity-50 font-medium'>View</p>
                </div>
            </div>


            {/* add new blog */}

            <Link
                to="/my-profile/add-new-blog"
                className='flex items-center justify-center gap-2 bg-bg-secondary text-white  border border-bg-secondary/30 text-xs font-semibold py-2.5 rounded-sm hover:opacity-90 transition-opacity duration-200'
            >
                <FaPlusCircle className='text-xs' />
                Add New Blog
            </Link>

            <div>
                <div className='flex flex-col gap-1'>
                    {tabs.map(tab => (
                        <NavLink
                            to={tab.key}
                            key={tab.key}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded text-xs font-medium transition-colors duration-200 cursor-pointer
                                ${isActive
                                    ? 'bg-bg-btn-2/85'
                                    : 'bg-bg-primary/60 text-gray-600 hover:bg-bg-primary'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            </div>
            <UserUpdateModal currentUser={currentUser} imagePreview={imagePreview} setImagePreview={setImagePreview} />
        </div>
    )
}

export default MyProfileSidebar