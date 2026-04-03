import React, { useState } from 'react'
import MyProfileSidebar from '../components/MyProfile/MyProfileSidebar'
import MyBlogsList from '../components/myProfile/MyBlogsList'

const MyProfile = () => {


    return (
        <div className='grid grid-cols-4 gap-8 px-10 py-8'>
            <div className='col-span-1'>
                <MyProfileSidebar />
            </div>
            <div>
                <MyBlogsList />
            </div>

        </div>
    )
}

export default MyProfile