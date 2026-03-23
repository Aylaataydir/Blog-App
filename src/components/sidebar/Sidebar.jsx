import React from 'react'
import CategoryList from './CategoryList'
import LatestBlogs from './MostLiked'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-8 ps-4'>
      <CategoryList />
      <LatestBlogs />
    </div>
  )
}

export default Sidebar