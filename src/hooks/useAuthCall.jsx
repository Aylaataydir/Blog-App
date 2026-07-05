

import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cleanUserData, fillUserData } from '../features/authSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const BASE_URL = import.meta.env.VITE_API_URL

const useAuthCall = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { token } = useSelector((state) => state.auth)


    const login = async (credentials) => {

        try {

            const { data } = await axios.post(`${BASE_URL}auth/login`, credentials)
            console.log(data)
            dispatch(fillUserData(data))
            toast.success("Login Successfull!", {
                description: `Welcome back ${data.user.username}`,
            });



            navigate("/")


        } catch (error) {
            toast.error("Login Failed", {
                description: "Please check your credentials",
            });
        }

    }


    const register = async (credentials) => {
        console.log(credentials)
        try {

            const { data } = await axios.post(`${BASE_URL}auth/register`, credentials)
            console.log(data)
            dispatch(fillUserData(data))


            toast.success("Register Successfull!", {
                description: `Welcome ${data.user.username}`,
            });

            navigate("/")


        } catch (error) {
            console.log(error.response?.data)
            toast.error("Register Failed", {
                description: "Please check your credentials",
            });
        }
    }


    const logOut = async () => {

        await new Promise((res) => setTimeout(res, 2000));

        try {

            await axios.post(`${BASE_URL}auth/logout`, {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            dispatch(cleanUserData())
            navigate("/")

        } catch (error) {
            console.log(error.message)
            toast.error("Logout Failed", {
                description: "Please try again",
            });
        }

    }

    return { login, register, logOut }
}

export default useAuthCall