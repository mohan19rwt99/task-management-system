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
    <div>
      <UserSidebar/>
        <Outlet/>
       
    </div>
  )
}

export default UserLayout
