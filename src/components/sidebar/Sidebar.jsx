import React from 'react'
import CategoryList from './CategoryList'
import LatestBlogs from './LatestBlogs'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-8'>
      <LatestBlogs />
      <CategoryList />
    </div>
  )
}

export default Sidebar