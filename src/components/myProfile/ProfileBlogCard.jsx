import React from 'react'
import { Link } from 'react-router-dom'


const ProfileBlogCard = ({ blog }) => {
    return (
        <>
            <Link to={`/blog/${blog?._id}`} className="flex items-center gap-3 w-full">
                <img
                    src={blog?.image}
                    alt={blog?.title}
                    className="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-800 line-clamp-2 hover:underline">
                        {blog?.title}
                    </span>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        <span>Views: <span className="font-semibold text-gray-700">{blog?.countOfVisitors || 0}</span></span>
                        <span>Likes: <span className="font-semibold text-gray-700">{blog?.likes.length || 0}</span></span>
                        <span>Comments: <span className="font-semibold text-gray-700">{blog?.comments.length || 0}</span></span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProfileBlogCard