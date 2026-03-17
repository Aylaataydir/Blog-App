import React from 'react'
import { useSelector } from 'react-redux'

const CategoryList = () => {

    const { categories } = useSelector(state => state.blog)

console.log(categories)
    return (
        <div className='flex flex-col border '>
            {categories?.map((cat) => (
                <button className='cursor-pointer p-2' key={cat._id}>{cat.name}</button>
                
            ))}
        </div>
    )
}

export default CategoryList