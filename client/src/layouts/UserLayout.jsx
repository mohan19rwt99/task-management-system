import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserSidebar from '../sidebar/UserSidebar'

function UserLayout() {
    const user = useSelector((state)=>state.Auth.user)
    console.log("user", user)
    const navigate= useNavigate()

    useEffect(()=>{
            if(!user){
                navigate('/login')
            }
    },[user])
  return (
    <>
      <div className='flex'>
      <UserSidebar/>
        <div className='flex-1 p-8'>
        <Outlet/>
        </div>
       
    </div>
    </>
  )
}

export default UserLayout
