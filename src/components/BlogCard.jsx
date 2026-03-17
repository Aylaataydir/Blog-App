
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as motion from "motion/react-client"
import { FcLike } from "react-icons/fc";
import { BiSolidShareAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";

const BlogCard = ({ blog }) => {
    const { categories } = useSelector(state => state.blog)
    console.log(categories)
    console.log(blog)

    const category = categories?.find(cat => cat._id === blog.categoryId)
    console.log(category?.name)

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className='relative'>
                <p className='absolute bg-amber-200 top-8 left-0 py-1 px-2'>May 8, 2026</p>
                <img
                    src={blog.image}
                    alt="" />
            </figure>
            <div className="card-body">
                <p>{category?.name}</p>
                <h2 className="card-title">{blog.title}</h2>
                <p className='line-clamp-3'>{blog.content}</p>
                <div className='mt-4'> <Link to="/" className="border p-1 rounded ">Read More</Link></div>
                <div className="flex mt-6 items-center justify-between gap-2">
                    <div className="avatar items-center gap-3">
                        <div className="ring-offset-base-100 w-12 rounded-full ring-1 ">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                        <p>name</p>

                    </div>
                    <div className='flex gap-2'>
                        <FcLike className='text-xl opacity-20 hover:opacity-100 cursor-pointer ' />

                        {/* <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                        style={ball}
                    >

                    </motion.div> */}
                        <BiSolidShareAlt className='text-xl opacity-20 hover:opacity-100 cursor-pointer' />
                        <FaEye className='text-xl opacity-20 hover:opacity-100 cursor-pointer' />
                        <BiSolidComment className='text-xl opacity-20 hover:opacity-100 cursor-pointer ' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BlogCard