import React from 'react'


const SkeletonMyBlogList = ({ count = 3 }) => {
    return (
        <ul className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <li key={index} className="flex items-center gap-3 bg-bg-primary/20 rounded-md px-3 py-2 border border-bg-secondary/10 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-md border border-gray-200 shadow-sm" />
                    <div className="flex flex-col flex-1 min-w-0 gap-2">
                        <div className="w-2/3 h-3 bg-gray-200 rounded" />
                        <div className="w-1/3 h-2 bg-gray-200 rounded" />
                        <div className="flex gap-4 mt-1 text-xs">
                            <div className="w-10 h-2 bg-gray-200 rounded" />
                            <div className="w-10 h-2 bg-gray-200 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-2 ml-2">
                        <div className="w-7 h-7 bg-gray-200 rounded-full" />
                        <div className="w-7 h-7 bg-gray-200 rounded-full" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default SkeletonMyBlogList