import React, { useEffect } from 'react'
import useBlogCall from '../../hooks/useBlogCall'
import { useSelector } from 'react-redux'

const MyBlogsList = () => {

    const { getDataByEndpoint } = useBlogCall()
    const { blogs } = useSelector(state => state.blog)
    const { currentUser } = useSelector(state => state.auth)
    console.log(blogs)

    const myBlogs = blogs?.filter(blog => blog.userId === currentUser._id)
    console.log(myBlogs)

    useEffect(() => {

        getDataByEndpoint("blogs", { "sort[createdAt]": "desc" }, "blogs")

    }, [])

    return (
        <div >
            {
                myBlogs.map(blog => (
                    kls

                ))

            }
        </div>
    )
}

export default MyBlogsList