import React from 'react'

const SkeletonHero = () => {
    return (
        <div className="flex p-3 gap-4 mt-16">
            <div className="w-66 h-48 bg-gray-200 rounded-lg flex-1" />
            <div className="flex flex-col flex-1 py-1 justify-between">
                <div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded-lg mb-6 mt-10" />
                    <div className="w-full h-3 bg-gray-200/60 rounded-lg mb-1" />
                    <div className="w-5/6 h-3 bg-gray-200/60 rounded-lg mb-1" />
                    <div className="w-full h-3 bg-gray-200/60 rounded-lg mb-1" />
                    <div className="w-5/6 h-3 bg-gray-200/60 rounded-lg mb-1" />
                    <div className="w-2/3 h-3 bg-gray-200/60 rounded-lg" />
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="w-12 h-3 bg-gray-200 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default SkeletonHero