
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
const {categories} = useSelector(state => state.blog)
console.log(categories)
console.log(blog)

const category = categories?.find(cat => cat._id === blog.categoryId )
console.log(category.name)

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={blog.image}
                    alt="" />
            </figure>
            <div className="card-body">
            <p>{category.name}</p>
                <h2 className="card-title">{blog.title}</h2>
                <p className='line-clamp-3'>{blog.content}</p>
                <div className="card-actions justify-start mt-5">
                    <Link to="/" className="btn btn-primary">Read More</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard