import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    loading: false,
    blogs: null,
    categories: null,
    blog: null,
    blogLikes: null,
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        fillEndpoints: ((state, { payload }) => {
            const { endpoint, data } = payload
            state[endpoint] = data
        }),
        fillBlog: ((state, { payload }) => {
            state.blog = payload
        }),
        fillBlogLikes: (state, { payload }) => {
            state.blogLikes = payload
        },
        updateLikes: (state, { payload }) => {
            const blog = state.blogs.find(b => b._id === payload.blogId)
            if (blog) {
                const index = blog.likes.indexOf(payload.userId)
                if(index > -1) {
                    blog.likes.splice(index,1)
                } else {
                    blog.likes.push(payload.userId)
                }
            }
        }
    }
})


export const { fillEndpoints, fillBlog, fillBlogLikes, updateLikes } = blogSlice.actions

export default blogSlice.reducer