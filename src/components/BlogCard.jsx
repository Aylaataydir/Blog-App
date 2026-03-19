import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as motion from "motion/react-client"
import { FcLike } from "react-icons/fc";
import { BiSolidShareAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { fillEndpoints } from '../features/blogSlice';
import { useEffect, useState } from 'react';
import useBlogCall from '../hooks/useBlogCall';


const BlogCard = ({ blog }) => {


    const { categories } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    const { updateLike, updateViewsById } = useBlogCall()
    const [isLike, setIsLike] = useState()
    const [copied, setCopied] = useState(false);
    const blogUrl = `${window.location.origin}/home/blog/${blog._id}`

    const navigate = useNavigate()

    const category = categories?.find(cat => cat._id === blog.categoryId)



    const toggleLike = () => {

        if (!currentUser) {
            navigate("/login")
        } else {
            updateLike(blog._id)
        }
    }

    const updateViewCount = () => {

        const updatedBlog = {
            ...blog,
            countOfVisitors: blog.countOfVisitors + 1
        }

        updateViewsById(blog._id, updatedBlog)

    }


    useEffect(() => {
        // if (blog.likes && currentUser) {
        setIsLike(blog.likes.includes(currentUser?._id))
        // }

    }, [blog.likes])



    return (
        <div className="card card-side bg-bg-body gap-5 ">
            <figure className='relative '>
                <p className='absolute bg-bg-primary top-8 left-0 py-1 px-2 h-7 w-26'>May 8, 2026</p>
                <img
                    className='rounded-lg w-80'
                    src={blog.image}
                    alt="" />
            </figure>
            <div className="card-body flex-1 p-3">
                <p className='text-xs text-bg-secondary'>{category?.name}</p>
                <h2 className="card-title ">{blog.title}</h2>
                <p className='text-sm line-clamp-3 leading-relaxed text-gray-700'>{blog.content}</p>
                <div className='mt-4'> <Link to={`/home/blog/${blog._id}`} onClick={updateViewCount} className="buttons">Read More</Link></div>
                <div className="flex mt-4 items-center justify-between gap-2">
                    <div className="avatar items-center gap-2">
                        <div className="ring-offset-base-100 w-8 rounded-full ring-1 ring-bg-btn ">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                        <p className='text-xs'>name</p>

                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='flex items-center gap-1'>
                            <FcLike onClick={toggleLike} className={` ${isLike ? "opacity-100" : "opacity-20"} text-xl  cursor-pointer  `} />
                            <p className='text-xs'>{blog.likes?.length}</p>
                        </div>


                        <BiSolidShareAlt
                            className='text-xl opacity-20 hover:opacity-100 cursor-pointer'
                            onClick={() => {
                                navigator.clipboard.writeText(blogUrl);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                        />
                        {copied && (
                            <span className='absolute bottom-15 right-0 bg-bg-secondary/70 text-white px-2 py-1 rounded text-xs shadow-md'>Link kopyalandı!</span>
                        )}
                        <div className='flex items-center gap-1'>
                            <FaEye className='text-xl opacity-20' />
                            <p className='text-xs'>{blog.countOfVisitors}</p>
                        </div>
                        <div className='relativ'>
                            <div className='relative flex items-center'>
                                <BiSolidComment className='text-2xl opacity-20 hover:opacity-100 cursor-pointer' />
                                <span className='absolute -top-2 -right-1 text-white bg-bg-secondary rounded-full px-1 text-xs   shadow-md'>{blog.comments?.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <
        </div>
    )
}

export default BlogCard