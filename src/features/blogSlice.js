import { createSlice } from "@reduxjs/toolkit"
import { FaSleigh } from "react-icons/fa"




const initialState = {
    fetchStatus: {
        blogs: "idle",
        blog: "idle",
        paginationBlogs: "idle",
        mostLiked: "idle",
        mostRead: "idle",
        userBlogs: "idle",
        userLikes: "idle",
        userSaves: "idle",
    },
    loading: false,
    paginationBlogs: null,
    userBlogs: null,
    categories: null,
    blog: null,
    mostLiked: null,
    mostRead: null,
    blogAuthor: null,
    searchedItems: null,
    editingBlog: null,
    blogAuthor: null,
    profilePageUserData: null,
    // blogs: null,
}

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {

        fetchStart: ((state, { payload }) => {
            state.fetchStatus[payload] = "loading"
        }),

        fillEndpoints: ((state, { payload }) => {
            const { stateName, data } = payload
            state[stateName] = data
            state.fetchStatus[stateName] = "succeeded"
        }),

        addCommentToBlog: ((state, { payload }) => {

            if (state.blog) state.blog.comments.push(payload)

        }),

        deleteCommentFromBlog: ((state, { payload }) => {
            if (state.blog) {
                state.blog.comments = state.blog.comments.filter(c => c._id !== payload)
            }
        }),

        toggleBlogLike: ((state, { payload }) => {
            console.log(payload)
            const { blogId, userId } = payload
            if (state.blog && state.blog._id === blogId) {
                const index = state.blog.likes.indexOf(userId)
                if (index === -1) state.blog.likes.push(userId)
                else state.blog.likes.splice(index, 1)
            }
            if (state.paginationBlogs) {
                const blog = state.paginationBlogs.find(b => b._id === blogId)
                console.log(blog)
                if (blog) {
                    const index = blog.likes.indexOf(userId)
                    console.log(index)
                    if (index === -1) blog.likes.push(userId)
                    else blog.likes.splice(index, 1)
                }
            }


        }),

        toggleBlogSave: ((state, { payload }) => {
            console.log(payload)
            const { blogId, userId } = payload
            if (state.paginationBlogs) {
                const blog = state.paginationBlogs.find(b => b._id === blogId)
                console.log(blog)
                if (blog) {
                    const index = blog.saves.indexOf(userId)
                    console.log(index)
                    if (index === -1) blog.saves.push(userId)
                    else blog.saves.splice(index, 1)
                }
            }
        }),

        setEditingBlog: ((state, { payload }) => {
            state.editingBlog = payload
        }),
        clearSearch: ((state, { payload }) => {
            state.searchedItems = null
        })

        // fillBlog: ((state, { payload }) => {
        //     state.blog = payload
        // }),

    }
})


export const { fillEndpoints, fillBlog, addCommentToBlog, deleteCommentFromBlog, toggleBlogLike, toggleBlogSave, toggleSearching, setEditingBlog, blogAuthor, fetchStatus, fetchStart, clearSearch, } = blogSlice.actions

export const mostReadStatus = (state) => state.blog.fetchStatus.mostRead
export const mostLikedStatus = (state) => state.blog.fetchStatus.mostLiked
export const paginationBlogsStatus = (state) => state.blog.fetchStatus.paginationBlogs
export const userBlogsStatus = (state) => state.blog.fetchStatus.userBlogs
export const blogDetailStatus = (state) => state.blog.fetchStatus.blog
export const userLikesStatus = (state) => state.blog.fetchStatus.userLikes
export const userSavesStatus = (state) => state.blog.fetchStatus.userSaves


export default blogSlice.reducer