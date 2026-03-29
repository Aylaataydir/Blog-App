import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useBlogCall from '../hooks/useBlogCall'
import { useDispatch, useSelector } from 'react-redux'
import { div } from 'motion/react-client'
import Sidebar from '../components/sidebar/Sidebar'
import { FaEye } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import * as motion from 'motion/react-client'
import { addCommentToBlog, deleteCommentFromBlog, toggleBlogLike } from '../features/blogSlice'
import { toast } from 'sonner'
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal from '../components/DeleteModal'



const BlogDetail = () => {

  const LIMIT = 5

  const { id } = useParams()

  const dispatch = useDispatch()
  const { getEndpointById, getDataByEndpoint, createComment, deleteComment } = useBlogCall()
  const { blog, categories } = useSelector(state => state.blog)
  const { currentUser } = useSelector(state => state.auth)
  const [comment, setComment] = useState("")
  const { updateLike } = useBlogCall()
  const [isLike, setIsLike] = useState()
  const [visibleCount, setVisibleCount] = useState(LIMIT)
  const [isSubmitting, setIsSubmitting] = useState()
  const [selectedCommentId, setSelectedCommentId] = useState(null)

  console.log(selectedCommentId)

  const displayedComments = blog?.comments
    ? [...blog.comments].reverse().slice(0, visibleCount)
    : []

  const category = categories?.find(cat => cat._id === blog?.categoryId?._id)

  console.log(blog)


  const handleLoadMore = () => {

    if (blog) setVisibleCount(prevCount => prevCount + LIMIT);

  }


  const handleCreateComment = async (e) => {

    e.preventDefault()
    setIsSubmitting(true)

    const newComment = {
      blogId: id,
      comment: comment
    }

    const response = await createComment(newComment)

    setTimeout(() => {
      dispatch(addCommentToBlog({
        id: response?._id || Date.now().toString(),
        comment: comment,
        userId: { _id: currentUser._id, username: currentUser.username },
        createdAt: new Date().toISOString()
      }))

      setComment("")
      setIsSubmitting(false)
      toast.success("Comment sent!")

    }, 1000)

  }


  const toggleLike = async () => {
    dispatch(toggleBlogLike(currentUser._id))
    setIsLike(prev => !prev)
    await updateLike(id)


  }


  useEffect(() => {
    getEndpointById("blogs", id, "blog")
    getDataByEndpoint("categories");

  }, [id])


  useEffect(() => {
    if (blog) {
      setIsLike(blog.likes.includes(currentUser._id))
    } else {
      setIsLike(false)
    }
  }, [blog])




  if (!blog) return <div>Loading...</div>


  return (
    <div className='grid grid-cols-3 gap-10 px-10 py-10'>
      <div className='col-span-2 flex flex-col gap-5'>
        <div>
          <p className='text-bg-secondary text-xs font-medium tracking-widest uppercase mb-2 font-[Poppins]'>{category?.name}</p>
          <h2 className='text-3xl font-semibold leading-snug font-[Poppins]'>{blog?.title}</h2>
        </div>
        <div className='overflow-hidden rounded-lg'>
          <img src={blog?.image} alt="" className='w-full object-cover' />
        </div>
        <div className='flex gap-4'>
          <div className='bg-bg-primary flex items-center gap-2 justify-center flex-1 text-sm text-center py-3'>
            <FaEye className='text-xl opacity-20' />
            <p>{blog?.countOfVisitors} Views</p>
          </div>
          <div className='bg-bg-primary flex items-center gap-2 justify-center flex-1 text-sm text-center py-3'>
            <motion.div
              whileTap={{ scale: 1.08 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 200, damping: 4 }}
              onClick={toggleLike}
              className='cursor-pointer'
            >
              <FaHeart className={`text-xl transition-colors duration-300 ${isLike ? 'text-red-500' : 'text-gray-300 hover:text-gray-400'}`} />
            </motion.div>
            <p className='mt-0.5'>{`${blog?.likes?.length} ${blog?.likes.length > 0 ? "Likes" : "Like"}`}</p>
          </div>


        </div>
        <p className='text-sm text-justify '>{blog?.content}</p>
        <div className="avatar items-center gap-3">
          <div className="ring-offset-base-100 w-12 rounded-full ring-1 ">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
          <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
        </div>


        {/* COMMENTS   */}

        <div className='pt-6 border-t border-t-gray-300/70'>
          <div className='bg-bg-primary/80 rounded-md p-3 shadow-sm'>
            <h3 className='text-base font-semibold mb-4 font-[Poppins]'>Leave a Comment</h3>
            <form onSubmit={handleCreateComment} className='flex flex-col gap-3'>
              <div className='flex gap-3'>
                <img className="size-8 rounded-full mt-0.5 shrink-0" src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                <div className='flex-1 flex flex-col gap-2'>
                  <span className='text-xs font-medium'>{currentUser?.username}</span>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    spellCheck={false}
                    className='w-full rounded-lg bg-bg-primary/60 px-4 py-3 text-xs leading-relaxed outline-none placeholder:opacity-40 resize-none h-24'
                    placeholder='Write your thoughts...'
                    required
                  ></textarea>
                </div>
              </div>
              <div className='flex justify-end'>
                <button type='submit' disabled={isSubmitting} className='buttons disabled:opacity-40 disabled:cursor-not-allowed'>{isSubmitting ? "sending" : "Post Comment"}</button>
              </div>
            </form>
          </div>
        </div>
        <h3 className='text-sm font-semibold tracking-wide opacity-60 mb-4 font-[Poppins]'>Comments</h3>
        <div className='flex flex-col gap-3'>
          {displayedComments?.map(comment => (
            <div className='flex gap-3 group' key={comment._id}>
              <img className="size-8 rounded-full mt-0.5 shrink-0" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
              <div className='bg-bg-primary/60 rounded-lg px-4 py-3 flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium'>{comment.userId.username}</span>
                  <span className='text-[10px] opacity-40'>
                    {new Date(comment.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>

                  {comment.userId._id === currentUser._id &&
                    <div className='ml-auto flex items-center gap-1'>
                      <button

                        className='p-1 rounded hover:bg-black/10 cursor-pointer transition-colors'>
                        <MdEdit className='text-sm opacity-50 hover:opacity-100' />
                      </button>
                      <button className='p-1 rounded hover:bg-red-100 cursor-pointer transition-colors'>
                        <MdDelete
                          onClick={() => {
                            setSelectedCommentId(comment._id)
                            document.getElementById('my_modal_5').showModal()
                          }}
                          className='text-sm opacity-50 hover:opacity-100 hover:text-red-800' />
                      </button>
                    </div>
                  }
                </div>
                <p className='mt-1.5 text-xs leading-relaxed opacity-80'>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < blog?.comments?.length &&
          <div className="flex justify-center mt-4 mb-2">
            <button
              onClick={handleLoadMore}
              className="text-xs font-medium tracking-wide text-bg-secondary hover:text-bg-secondary/70 border-b border-bg-secondary/40 hover:border-bg-secondary pb-0.5 transition-colors cursor-pointer"
            >
              Load More
            </button>
          </div>
        }
      </div>

      <div className='mt-20'>
        <Sidebar />
      </div>
      <DeleteModal commentId={selectedCommentId} />
    </div>

  )
}

export default BlogDetail