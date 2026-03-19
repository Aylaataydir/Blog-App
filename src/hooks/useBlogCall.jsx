
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fillBlog, fillEndpoints } from '../features/blogSlice'

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

            getDataByEndpoint("blogs")
        } catch (error) {
            console.log(error)
        }
    }


    const updateViewsById = async (blogId, blog) => {
        try {
            const { data } = await axios.put(`${BASE_URL}blogs/${blogId}`, { blog }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            console.log(data)
            getDataByEndpoint("blogs")



        } catch (error) {
            console.log(error)
        }
    }


    const getComments = async () => {

        // try {

        //     const { data } = await axios.get(`${BASE_URL}comments/`, {
        //         headers: {
        //             Authorization: `Token ${token}`
        //         }
        //     })
        //     console.log(data.data)


        // } catch (error) {
        //     console.log(error)

        // }
    }

    const createComment = async (comment) => {

        try {

            const { data } = await axios.post(`${BASE_URL}comments/`, comment, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)

        } catch (error) {
            console.log(error)

        }
    }



    return { getDataByEndpoint, getBlogById, getLikesById, updateLike, updateViewsById, getComments, createComment }
}

export default useBlogCall