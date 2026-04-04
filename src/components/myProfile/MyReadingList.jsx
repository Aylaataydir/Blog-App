import React from 'react'
import { FaBookmark } from 'react-icons/fa'

const MyReadingList = () => {
    return (
        <div className='flex flex-col'>
            <div className='pb-2 mb-6 border-b border-b-bg-secondary/50'>
                <h2 className='text-base font-semibold font-[Poppins]'>My Reading List</h2>
                <p className='text-xs opacity-50 mt-1'>Blog posts you saved to read later</p>
            </div>
            <div className='flex flex-col items-center justify-center py-16 opacity-40'>
                <FaBookmark className='text-3xl mb-3' />
                <p className='text-sm'>Your reading list is empty.</p>
            </div>
        </div>
    )
}

export default MyReadingList