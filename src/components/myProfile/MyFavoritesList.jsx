import React from 'react'
import { FaStar } from 'react-icons/fa'

const MyFavoritesList = () => {
    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>My Favorites</h2>
                <p className='text-xs opacity-50 mt-1'>Blog posts you have liked</p>
            </div>
            <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                <FaStar className='text-3xl mb-3' />
                <p className='text-sm'>No favorites yet.</p>
            </div>
        </div>
    )
}

export default MyFavoritesList