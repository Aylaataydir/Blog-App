import { div } from 'motion/react-client'
import React from 'react'
import { useSelector } from 'react-redux'

const CategoryList = () => {

    const { categories } = useSelector(state => state.blog)

    console.log(categories)
    return (
        <div className='flex flex-col gap-4 '>
            <div>
                <h3 className='bg-bg-secondary text-center py-2 font-semibold text-white '>CATEGORIES</h3>
            </div>
            {categories?.map((cat) => (
                <div className='relative mt-2' key={cat._id}>
                    <img src={`/assets/${cat.name}.jpg`} alt={cat.name} className='h-12 w-full object-cover opacity-90' />
                    <button
                        className='cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary/90 px-9 py-1  font-bold w-30 '
                    >
                        {cat.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default CategoryList