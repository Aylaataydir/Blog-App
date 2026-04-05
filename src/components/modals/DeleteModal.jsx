import React from 'react'
import { useDispatch } from 'react-redux'
import useBlogCall from '../../hooks/useBlogCall'
import { deleteCommentFromBlog } from '../../features/blogSlice'
import { LuTriangleAlert } from 'react-icons/lu'

const DeleteModal = ({ commentId, title, blogId }) => {

    const dispatch = useDispatch()
    const { deleteComment, deleteBlog } = useBlogCall()

    const handleDelete = async () => {

        if (title === "comment") {
            await deleteComment(commentId)
            dispatch(deleteCommentFromBlog(commentId))
        } else {
            await deleteBlog(blogId)
        }
        document.getElementById('my_modal_5').close()
    }

    console.log(blogId)

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-bg-primary rounded-lg max-w-sm p-0 overflow-hidden">
                <div className="flex flex-col items-center text-center px-6 pt-6 pb-4">
                    <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center mb-3">
                        <LuTriangleAlert className="text-red-500 text-lg" />
                    </div>
                    <h3 className="font-semibold font-[Poppins] text-base text-gray-800">{`Remove ${title}?`}</h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{`Are you sure you want to delete this ${title}? This action cannot be undone.`}</p>
                </div>
                <div className="flex border-t border-bg-btn-2 divide-x divide-bg-btn-2">
                    <form method="dialog" className="flex-1">
                        <button className="w-full py-2.5 text-xs font-medium font-[Poppins] text-gray-600 hover:bg-bg-btn-2/50 transition-colors cursor-pointer">
                            Cancel
                        </button>
                    </form>
                    <button
                        onClick={handleDelete}
                        className="flex-1 py-2.5 text-xs font-semibold font-[Poppins] text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                        Delete
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop"><button /></form>
        </dialog>
    )
}

export default DeleteModal