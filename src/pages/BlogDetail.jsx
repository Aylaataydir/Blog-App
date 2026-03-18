import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useBlogCall from '../hooks/useBlogCall'
import { useSelector } from 'react-redux'

const BlogDetail = () => {

  const { getBlogById, getDataByEndpoint } = useBlogCall()
  const { blog, categories } = useSelector(state => state.blog)
  const { currentUser } = useSelector(state => state.auth)

  const { id } = useParams()

  console.log(id)
  console.log(blog)
  console.log(categories)
  

  const category = categories?.find(cat => cat._id === blog?.categoryId._id)

  console.log(category?.name)


  useEffect(() => {

    getBlogById(id)
    getDataByEndpoint("categories");

  }, [id])




  if (!blog) return <div>Loading...</div>


  return (
    <div className='mt-10'>
      <p>{category?.name}</p>
      <h2>{blog.title}</h2>
      <img src={blog.image} alt="" width={500} />
      <div>
        <p>views</p>
        <p>like</p>
      </div>
      <p>{blog.content}</p>
      <div className="avatar items-center gap-3">
        <div className="ring-offset-base-100 w-12 rounded-full ring-1 ">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
        </div>
        <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
      </div>
      <form action="">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your bio</legend>
          <textarea className="textarea h-24" placeholder="Bio"></textarea>
        </fieldset>
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">What is your name?</legend>
            <input type="text" className="input" placeholder="Type here" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">What is your name?</legend>
            <input type="text" className="input" placeholder="Type here" />
          </fieldset>
        </div>
      </form>

      <ul className="list bg-base-100 rounded-box shadow-md">

        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Comments</li>

        <li className="list-row">
          <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
          </div>
          <button className="btn btn-square btn-ghost">
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
          </button>
        </li>
      </ul>


    </div>
  )
}

export default BlogDetail