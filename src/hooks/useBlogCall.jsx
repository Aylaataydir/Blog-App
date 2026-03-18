
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fillBlog, fillBlogLikes, fillEndpoints, updateLikes } from '../features/blogSlice'

const BASE_URL = import.meta.env.VITE_API_URL

const useBlogCall = () => {


    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const getDataByEndpoint = async (endpoint) => {

        try {

            const { data } = await axios.get(`${BASE_URL}${endpoint}/`)

            dispatch(fillEndpoints({ endpoint, data: data.data }))
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const getBlogById = async (blogId) => {

        try {

            const data = await axios.get(`${BASE_URL}blogs/${blogId}`)
            console.log(data.data.data)
            dispatch(fillBlog(data.data.data))


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
            dispatch(fillBlogLikes(data.countOfLikes))

        } catch (error) {
            console.log(error)

        }
    }


    const updateLike = async (userId) => {

        try {

            const { data } = await axios.post(`${BASE_URL}blogs/${userId}/postLike`, {} , {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data, ":data")
         dispatch(updateLikes({blogId:userId, userId: token}))

        } catch (error) {
            console.log(error)

        }

    }



    return { getDataByEndpoint, getBlogById, getLikesById, updateLike }
}

export default useBlogCall