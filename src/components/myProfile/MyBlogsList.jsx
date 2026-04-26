import React, { useEffect, useState } from 'react'
import useBlogCall from '../../hooks/useBlogCall'
import { useDispatch, useSelector } from 'react-redux'
import SmallBlogCard from '../SmallBlogCard'
import { Link, useNavigate } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { setEditingBlog, userBlogsStatus } from '../../features/blogSlice'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../modals/DeleteModal'
import SkeletonSmallCard from '../skeletons/SkeletonMyBlogList'
import { div } from 'framer-motion/client'
import SkeletonMyBlogList from '../skeletons/SkeletonMyBlogList'

const MyBlogsList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { getDataByEndpoint } = useBlogCall()
    const { userBlogs } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    const loadingStatus = useSelector(userBlogsStatus)
    const [blogId, setBlogId] = useState(null)


    const handleEditBlog = (blog) => {

        dispatch(setEditingBlog(blog))
        navigate("/my-profile/edit-blog")

    }



    useEffect(() => {
        getDataByEndpoint("blogs", { "sort[createdAt]": "desc", "filter[userId]": currentUser._id }, "userBlogs")

    }, [])

    if (loadingStatus === "idle" || loadingStatus === "loading") {
        return (
            <div>
                <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                    <h2 className='text-base font-semibold  font-[Poppins]'>My Blogs</h2>
                    <p className='text-xs opacity-50 mt-1'>All blog posts you have published</p>
                </div>
                <SkeletonMyBlogList count={4} />
            </div>

        )
    }

    if (!userBlogs) {
        return (
            <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                <FaPen className='text-3xl mb-3' />
                <p className='text-sm'>No blogs yet.</p>
            </div>
        )
    }


    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>My Blogs</h2>
                <p className='text-xs opacity-50 mt-1'>All blog posts you have published</p>
            </div>
            {userBlogs && userBlogs.length > 0 ? (
                <ul className="grid lg:grid-cols-1 gap-3">
                    {userBlogs.map(blog => (
                        <li key={blog._id} className="flex items-center gap-3 bg-bg-primary/20 hover:bg-bg-primary/80 transition rounded-md px-3 py-2 border border-bg-secondary/10 relative group">
                            <Link to={`/blog/${blog._id}`} className="flex items-center gap-3 w-full">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                                />
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-medium text-gray-800 line-clamp-2 hover:underline">
                                        {blog.title}
                                    </span>
                                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                        <span>Views: <span className="font-semibold text-gray-700">{blog.countOfVisitors || 0}</span></span>
                                        <span>Likes: <span className="font-semibold text-gray-700">{blog.likes.length || 0}</span></span>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex gap-2 ml-2">
                                <button onClick={() => handleEditBlog(blog)} title="Edit" className='p-1.5 bg-white/90 text-gray-700 rounded-full hover:bg-blue-900 hover:text-white transition-colors cursor-pointer shadow-sm'>
                                    <FaPen size={12} />
                                </button>
                                <button onClick={() => { setBlogId(blog._id); document.getElementById('my_modal_5').showModal() }} title="Delete" className='p-1.5 bg-white/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer shadow-sm'>
                                    <MdDelete size={14} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                    <FaPen className='text-3xl mb-3' />
                    <p className='text-sm'>No blogs yet.</p>
                </div>
            )}
            <DeleteModal title="Blog" blogId={blogId} />
        </div>
    )
}

export default MyBlogsList