import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouted = () => {

  const {currentUser} = useSelector(state => state.auth)
  console.log(currentUser)

  return (
    <div>
      {currentUser ? <Outlet/> : <Navigate to="/login"/>}
    </div>
  )
}

export default ProtectedRouted