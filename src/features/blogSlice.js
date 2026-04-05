import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    loading: false,
    blogs: null,
    paginationBlogs: null,
    userBlogs:null,
    categories: null,
    blog: null,
    mostLiked: null,
    mostRead: null,
    blogAuthor: null,
    isSearching: false,
    editingBlog:null
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        fillEndpoints: ((state, { payload }) => {
            const { stateName, data } = payload
            state[stateName] = data
        }),
        fillBlog: ((state, { payload }) => {
            state.blog = payload
        }),
        toggleBlogLike: ((state, { payload }) => {

            if (state.blog) {
                const index = state.blog.likes.indexOf(payload)
                if (index === -1) {
                    state.blog.likes.push(payload)
                } else {
                    state.blog.likes.splice(index, 1)
                }

            }
        }),
        addCommentToBlog: ((state, { payload }) => {

            if (state.blog) state.blog.comments.push(payload)

        }),
        deleteCommentFromBlog: ((state, { payload }) => {
            if (state.blog) {
                state.blog.comments = state.blog.comments.filter(c => c._id !== payload)
            }
        }),
        toggleBlogListLike: ((state, { payload }) => {
            const { blogId, userId } = payload
            if (state.paginationBlogs) {
                const blog = state.paginationBlogs.find(b => b._id === blogId)
                if (blog) {
                    const index = blog.likes.indexOf(userId)
                    if (index === -1) blog.likes.push(userId)
                    else blog.likes.splice(index, 1)
                }
            }
        }),
        toggleSearching: ((state, {payload}) => {
            state.isSearching = payload
        }),
        setEditingBlog: ((state, {payload}) => {
            state.editingBlog = payload
        })

    }
})


export const { fillEndpoints, fillBlog, toggleBlogLike, addCommentToBlog, deleteCommentFromBlog, toggleBlogListLike, toggleSearching, setEditingBlog } = blogSlice.actions

export default blogSlice.reducer