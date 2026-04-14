import React from 'react'


const SkeletonSmallCard = () => {
    return (
        <div className='flex gap-5 '>
            { Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-[180px] flex flex-col bg-white rounded-xl overflow-hidden shadow-sm w-[180px] mx-auto mb-2 animate-pulse">
                        <figure className="relative">
                            <div className="w-full h-25 bg-gray-200" />
                            <span className="absolute top-2 left-2 w-14 h-4 bg-gray-200 rounded-full" />
                        </figure>
                        <div className="flex flex-1 flex-col p-3">
                            <div className="w-3/4 h-2 bg-gray-200 rounded-lg mb-1" />
                            <div className="w-3/4 h-2 bg-gray-200 rounded-lg mb-2" />
                            <div className="flex justify-between items-center mt-auto">
                                <div className="w-20 h-2 bg-gray-200 rounded-lg" />
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-2 bg-gray-200 rounded-lg" />
                                    <div className="w-6 h-2 bg-gray-200 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))

            }
        </div>

    )
}

export default SkeletonSmallCard