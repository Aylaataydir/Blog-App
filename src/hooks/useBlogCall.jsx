
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { fillEndpoints } from '../features/blogSlice'

const BASE_URL = import.meta.env.VITE_API_URL

const useBlogCall = () => {


const dispatch = useDispatch()

    const getDataByEndpoint = async (endpoint) => {

        try {

            const { data } = await axios.get(`${BASE_URL}${endpoint}/`)
           
          dispatch(fillEndpoints({endpoint, data})) 


        } catch (error) {
            console.log(error)
        }

    }



    return { getDataByEndpoint }
}

export default useBlogCall