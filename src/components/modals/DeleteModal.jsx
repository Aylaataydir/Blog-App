import React from 'react'
import { useDispatch } from 'react-redux'
import useBlogCall from '../../hooks/useBlogCall'
import { deleteCommentFromBlog } from '../../features/blogSlice'

const DeleteModal = ({ commentId }) => {

    const dispatch = useDispatch()
    const { deleteComment } = useBlogCall()
    console.log(commentId)

    // <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>

    const handleDeleteComment = async() => {
        await deleteComment(commentId)
        dispatch(deleteCommentFromBlog(commentId))
    }


    return (
        <div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Remove comment?</h3>
                    <p className="py-2">Are you sure you want to delete your comment?</p>
                    <div className="modal-action">
                        <form method="dialog" className='flex gap-2 '>
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                onClick={handleDeleteComment}
                                className="btn text-white bg-red-500 text-xs">Delete</button>
                            <button className="btn text-xs">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DeleteModal