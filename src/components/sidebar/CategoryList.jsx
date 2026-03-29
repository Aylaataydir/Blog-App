import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { slugify } from '../../lib/slugify'

const CategoryList = () => {

    const { categories } = useSelector(state => state.blog)
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('category')

    return (
        <div className='gap-4 mb-8 '>
            <div>
                <h3 className='bg-bg-secondary text-center py-2 font-semibold text-white '>CATEGORIES</h3>
            </div>
            <div className='mt-5 grid grid-cols-2 gap-2' >
                <Link
                    to="/home"
                    className={`${activeCategory ? "bg-bg-primary/80" : "bg-bg-btn-2"} category-btn flex-1 rounded cursor-pointer px-9 py-2 font-bold text-center`}
                >
                    All Categories
                </Link>
                {categories?.map((cat) => {
                    const slug = slugify(cat.name)
                    return (
                        <Link key={cat._id}
                            to={`/home?category=${slug}`}
                            className={`${activeCategory === slug ? "bg-bg-btn-2" : "bg-bg-primary/80"} category-btn flex-1 rounded cursor-pointer px-9 py-2 font-bold text-center`}
                        >
                            {cat.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryList