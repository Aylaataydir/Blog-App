
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { updateUserData } from '../features/authSlice'
import { fetchStart, fillEndpoints } from '../features/blogSlice'

const BASE_URL = import.meta.env.VITE_API_URL

const useBlogCall = () => {


    const { token, currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch()



    const getDataByEndpoint = async (endpoint, customParams = {}, stateName = endpoint) => {

        try {
            dispatch(fetchStart(stateName));
            const { data } = await axios.get(`${BASE_URL}${endpoint}/`, {
                params: customParams
            })
            console.log(data)
            dispatch(fillEndpoints({ stateName, data: data.data}))
            console.log(stateName)
            return data

        } catch (error) {
            console.log(error)
        }
    }


    const getEndpointById = async (endpoint, id, stateName = "") => {
console.log(stateName)
        try {
            dispatch(fetchStart());
            const data = await axios.get(`${BASE_URL}${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data.data)
            if (stateName) dispatch(fillEndpoints({ stateName, data: data.data.data }))


        } catch (error) {
            console.log(error)
        }

    }


    const getLikesById = async (userId) => {

        try {

            const { data } = await axios.get(`${BASE_URL}blogs/${userId}/getLike`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateSaveBlog = async (blogId) => {
        try {
            const { data } = await axios.post(`${BASE_URL}blogs/${blogId}/saveBlog`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    const createComment = async (comment) => {

        try {

            const { data } = await axios.post(`${BASE_URL}comments/`, comment, {
                headers: {
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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
                    Authorization: `Bearer ${token}`
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


    const UploadCloudinary = async (formData) => {
        console.log(formData)
        try {

            const data = await axios.post(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, formData)
            return data.data

        } catch (error) {
            console.log(error.message)
            toast.error("Image upload failed, please try again.")
        }
    }


    return { getDataByEndpoint, getEndpointById, getLikesById, updateLike, createComment, deleteComment, addBlog, updateUserCredentials, updateBlog, deleteBlog, UploadCloudinary, updateSaveBlog }
}

export default useBlogCall