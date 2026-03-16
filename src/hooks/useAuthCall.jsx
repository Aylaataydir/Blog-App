

import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_API_URL

const useAuthCall = () => {

    const navigate = useNavigate()


    const login = async (credentials) => {

        try {

           const {data} = await axios.post(`${BASE_URL}auth/login`, credentials)
            console.log(data)
            navigate("/")


        } catch (error) {
            console.log(error)
        }

    }


    const register = async (credentials) => {

        try {

            const { data } = await axios.post(`${BASE_URL}users/`, credentials)
            console.log(data)
            navigate("/")


        } catch (error) {
            console.log(error)
        }

    }


    return { login, register }
}

export default useAuthCall