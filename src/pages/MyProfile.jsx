import React, { useState } from 'react'
import MyProfileSidebar from '../components/MyProfile/MyProfileSidebar'
import MyBlogsList from '../components/myProfile/MyBlogsList'
import { Outlet } from 'react-router-dom'

const MyProfile = () => {


    return (
        <div className='grid grid-cols-7 gap-11 px-10 py-8'>
            <div className='col-span-2'>
                <MyProfileSidebar />
            </div>
            <div className='col-span-5'>
                <Outlet/>
            </div>

        </div>
    )
}

export default MyProfile