import React, { useEffect, useState } from 'react'
import useBlogCall from '../../hooks/useBlogCall'
import { useDispatch, useSelector } from 'react-redux'
import SmallBlogCard from '../SmallBlogCard'
import { Link, useNavigate } from 'react-router-dom'
import { FaPen } from 'react-icons/fa'
import { setEditingBlog } from '../../features/blogSlice'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../modals/DeleteModal'

const MyBlogsList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { getDataByEndpoint } = useBlogCall()
    const { userBlogs } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    const [blogId , setBlogId] = useState(null)


    const handleEditBlog = (blog) => {

        dispatch(setEditingBlog(blog))
        navigate("/my-profile/add-new-blog")

    }

   

    useEffect(() => {
        getDataByEndpoint("blogs", { "sort[createdAt]": "desc", "filter[userId]": currentUser._id }, "userBlogs")

    }, [])



    if (!userBlogs) {
        return (
            <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                <FaPen className='text-3xl mb-3' />
                <p className='text-sm'>No blogs yet.</p>
            </div>
        )
    }


    return (

        <div className='flex flex-col '>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold  font-[Poppins]'>My Blogs</h2>
                <p className='text-xs opacity-50 mt-1'>All blog posts you have published</p>
            </div>
            <div className='flex gap-7 flex-wrap '>
                {userBlogs?.length > 0 ? userBlogs.map(blog => (
                    <div key={blog._id} className='relative group'>
                        <Link to={`/blog/${blog._id}`}>
                            <SmallBlogCard blog={blog} />
                        </Link>
                        <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-xl'>
                            <button onClick={() => handleEditBlog(blog)} className='p-1.5 bg-white/90 text-gray-700 rounded-full hover:bg-blue-900 hover:text-white transition-colors cursor-pointer shadow-sm'>
                                <FaPen size={10} />
                            </button>
                            <button  onClick={() => { setBlogId(blog._id); document.getElementById('my_modal_5').showModal() }} className='p-1.5 bg-white/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer shadow-sm'>
                                <MdDelete size={14} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <p className='text-sm opacity-40 '>You haven't published any blogs yet.</p>
                )}
            </div>
            <DeleteModal title="Blog" blogId={blogId} />
        </div>
    )
}

export default MyBlogsList