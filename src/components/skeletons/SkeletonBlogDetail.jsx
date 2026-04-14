import React from 'react'

const SkeletonBlogDetail = () => {
    return (
        <div className="flex flex-col rounded-xl md:w-full lg:w-4/6 mt-12 ms-5 ">
            <span className=" w-14 h-3 bg-gray-200 rounded-2xl ms-4" />
            <div className="flex flex-1 flex-col p-3">
                <div className="w-full h-5 bg-gray-200 rounded-2xl mb-3" />
                <div className="w-full h-5 bg-gray-200 rounded-2xl mb-10" />
            </div>
            <figure className="relative">
                <div className="w-full h-80 bg-gray-200 rounded-2xl" />

            </figure>
        </div>
    )
}

export default SkeletonBlogDetail