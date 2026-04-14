import { div } from 'framer-motion/client'
import React from 'react'

const SkeletonBlogList = () => {
    return (
        <div>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex gap-5 p-4 mb-4 rounded-lg">
                    <div className="w-66 h-48 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col flex-1 py-1 justify-between">
                        <div>
                            <div className="w-24 h-3 bg-gray-200 rounded-lg mb-2" />
                            <div className="w-3/4 h-4 bg-gray-200 rounded-lg mb-6" />
                            <div className="w-full h-3 bg-gray-200/60 rounded-lg mb-1" />
                            <div className="w-5/6 h-3 bg-gray-200/60 rounded-lg mb-1" />
                            <div className="w-2/3 h-3 bg-gray-200/60 rounded-lg" />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-12 h-3 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonBlogList