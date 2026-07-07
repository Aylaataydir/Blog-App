import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { slugify } from '../../lib/slugify'
import { li } from 'framer-motion/client'

const CategoryList = () => {

    const { categories } = useSelector(state => state.blog)
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('category')

    return (
        <div className='gap-4 mb-8 '>
            <div className="flex justify-end me-3 lg:hidden">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn text-md md:text-lg md:p-7 md:text-bold bg-bg-secondary">CATEGORIES</div>
                    <ul tabIndex="-1" className="dropdown-content menu text-sm md:text-lg  bg-base-100 rounded-box mt-1 z-60 w-45 md:w-60 gap-1 shadow-sm">
                        <li> <Link
                            to="/home"
                            className={`${activeCategory ? "bg-bg-primary/80" : "bg-bg-btn-2"} category-btn flex-1 rounded cursor-pointer px-4 py-2 md:py-3 font-semibold text-center`}
                        >
                            All
                        </Link></li>
                        {categories?.map((cat) => {
                            const slug = slugify(cat.name)
                            return (
                                <li><Link key={cat._id}
                                    to={`/home?category=${slug}`}
                                    className={`${activeCategory === slug ? "bg-bg-btn-2" : "bg-bg-primary/80"} category-btn flex-1 rounded cursor-pointer px-4 py-2 md:py-3 font-semibold text-center`}
                                >
                                    {cat.name}
                                </Link></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='hidden lg:block'>
                <div>
                    <h3 className='bg-bg-secondary text-center py-2 font-semibold text-white '>CATEGORIES</h3>
                </div>
                <div className='mt-5 grid grid-cols-2 gap-2' >
                    <Link
                        to="/home"
                        className={`${activeCategory ? "bg-bg-primary/80" : "bg-bg-btn-2"} category-btn flex-1 rounded cursor-pointer px-9 py-2 font-bold text-center`}
                    >
                        All
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

        </div>
    )
}

export default CategoryList