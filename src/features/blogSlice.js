import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    loading: false,
    blogs: null,
    categories: null,
    blog: null,
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
    
    }
})


export const { fillEndpoints, fillBlog, fillBlogLikes, updateLikes } = blogSlice.actions

export default blogSlice.reducer