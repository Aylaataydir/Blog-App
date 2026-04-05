
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fillBlog, fillEndpoints } from '../features/blogSlice'
import { toast } from 'sonner'
import { updateUserData } from '../features/authSlice'

const BASE_URL = import.meta.env.VITE_API_URL

const useBlogCall = () => {


    const { token, currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch()



    const getDataByEndpoint = async (endpoint, customParams = {}, stateName = endpoint) => {

        try {

            const { data } = await axios.get(`${BASE_URL}${endpoint}/`, {
                params: customParams
            })

            dispatch(fillEndpoints({ stateName, data: data.data }))
            return data

        } catch (error) {
            console.log(error)
        }
    }


    const getEndpointById = async (endpoint, blogId, stateName) => {

        try {

            const data = await axios.get(`${BASE_URL}${endpoint}/${blogId}`)
            console.log(data.data.data)
            dispatch(fillEndpoints({ stateName, data: data.data.data }))


        } catch (error) {

        }

    }


    const getLikesById = async (userId) => {

        try {

            const { data } = await axios.get(`${BASE_URL}blogs/${userId}/getLike`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })


        } catch (error) {
            console.log(error)

        }
    }



    const updateLike = async (blogId) => {
        try {
            const { data } = await axios.post(`${BASE_URL}blogs/${blogId}/postLike`, {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

        } catch (error) {
            console.log(error)
        }
    }



    const createComment = async (comment) => {

        try {

            const { data } = await axios.post(`${BASE_URL}comments/`, comment, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
            return data

        } catch (error) {
            console.log(error)

        }
    }



    const deleteComment = async (commentId) => {

        try {
            const { data } = await axios.delete(`${BASE_URL}comments/${commentId}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)


        } catch (error) {
            console.log(error)

        }
    }



    const addBlog = async (newBlog) => {

        await new Promise(resolve => setTimeout(resolve, 1000))

        try {

            await axios.post(`${BASE_URL}blogs/`, newBlog, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            toast.success("Your blog has been published.")

            return true

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.")
            return false
        }
    }




    const updateUserCredentials = async (userId, updatedCredentials) => {

        await new Promise(resolve => setTimeout(resolve, 1000))

        try {
            await axios.put(`${BASE_URL}users/${userId}`, updatedCredentials, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            dispatch(updateUserData(updatedCredentials))
            toast.success("Your credentials updated.")

            return true

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.")

            return false
        }
    }



    const updateBlog = async (blogId, updatedBlog) => {

        await new Promise(resolve => setTimeout(resolve, 1000))

        try {
            await axios.put(`${BASE_URL}blogs/${blogId}`, updatedBlog, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            await getDataByEndpoint("blogs", { "filter[userId]": currentUser._id }, "userBlogs")
            toast.success("Your blog updated.")

            return true

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.")

            return false
        }
    }




    const deleteBlog = async (blogId) => {

        try {
            await axios.delete(`${BASE_URL}blogs/${blogId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            await getDataByEndpoint("blogs", { "filter[userId]": currentUser._id }, "userBlogs")
            toast.success("Your blog deleted.")

            return true

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong. Please try again.")

            return false
        }
    }


    return { getDataByEndpoint, getEndpointById, getLikesById, updateLike, createComment, deleteComment, addBlog, updateUserCredentials, updateBlog, deleteBlog }
}

export default useBlogCall