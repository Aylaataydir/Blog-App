import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as motion from "motion/react-client"
import { BiSolidShareAlt } from "react-icons/bi";
import { FaEye, FaHeart } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { fillEndpoints, toggleBlogListLike } from '../features/blogSlice';
import { useEffect, useState } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import { toast } from 'sonner';
import { slugify } from '../lib/slugify';


const BlogCard = ({ blog }) => {

    const dispatch = useDispatch()
    const { categories, blogs } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    const { updateLike, getDataByEndpoint } = useBlogCall()
    const [isLike, setIsLike] = useState()
    const [copied, setCopied] = useState(false);
    const blogUrl = `${window.location.origin}/blog/${blog._id}`

    const navigate = useNavigate()

    const category = categories?.find(cat => cat._id === blog.categoryId)

    console.log(blogs)

    const toggleLike = async () => {

        if (!currentUser) {
            toast.error("Please log in to like this post.")
        } else {
            setIsLike(prev => !prev)
            await updateLike(blog._id)
            dispatch(toggleBlogListLike({ blogId: blog._id, userId: currentUser._id }))
        }
    }

    const clickComment = () => {
        if (!currentUser) {
            toast.error("Please log in to post a comment.")
        } else {
            navigate(`/blog/${blog._id}`)
        }
    }

    const slug = slugify(blog.title)


    useEffect(() => {

        setIsLike(blog?.likes.includes(currentUser?._id))


    }, [blog, currentUser])



    return (
        <div className="blog-card flex gap-5 p-4">
            <figure className='relative flex-shrink-0'>
                <p className='absolute bg-bg-primary/90 top-2 left-0 py-0.5 px-2 text-[10px] tracking-wide'>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                </p>
                <img className='rounded-lg w-64 h-44 object-cover' src={blog.image} alt="" />
            </figure>
            <div className="flex flex-col flex-1 py-1 justify-between">
                <div>
                    <p className='text-[10px] text-bg-secondary font-semibold uppercase tracking-widest mb-1'>{category?.name}</p>
                    <h2 className="text-xl font-semibold leading-snug mb-2">{blog.title}</h2>
                    <div className='tiptap text-xs line-clamp-3 leading-relaxed text-gray-700' dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className='flex items-center justify-between mt-3'>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-bg-btn">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                        <p className='text-xs text-gray-400'>Author</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div className='flex items-center gap-1'>
                            <motion.div
                                whileTap={{ scale: 1.4 }}
                                whileHover={{ scale: 1.15 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                                onClick={toggleLike}
                                className='cursor-pointer'
                            >
                                <FaHeart className={`text-base transition-colors duration-300 ${isLike ? 'text-red-500' : 'text-gray-300 hover:text-gray-400'}`} />
                            </motion.div>
                            <p className='text-xs text-gray-400'>{blog.likes?.length}</p>
                        </div>
                        <div className='flex items-center gap-1 relative'>
                            <BiSolidShareAlt className='text-base opacity-30 hover:opacity-80 cursor-pointer transition-opacity' onClick={() => { navigator.clipboard.writeText(blogUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} />
                            {copied && <span className='absolute -top-7 left-0 bg-bg-secondary text-white px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow'>Copied!</span>}
                        </div>
                        <div className='flex items-center gap-1'>
                            <FaEye className='text-base opacity-30' />
                            <p className='text-xs text-gray-400'>{blog.countOfVisitors}</p>
                        </div>
                        <div className='relative flex items-center'>
                            <BiSolidComment
                                onClick={clickComment}
                                className='text-base opacity-30 hover:opacity-80 cursor-pointer transition-opacity' />
                            <span className='absolute -top-2 -right-1.5 bg-bg-secondary text-white rounded-full px-1 text-[9px] leading-tight'>{blog.comments?.length}</span>
                        </div>
                        <Link onClick={(e) => { if (!currentUser) { e.preventDefault(); toast.error("Please log in to read this post.") } }} to={`/blog/${slug}-${blog._id}`} className="buttons ms-3">Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard