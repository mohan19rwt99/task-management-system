import React, { useEffect } from 'react'
import { get } from '../services/ApiEndpoint'

function Admin() {

   useEffect(()=>{
    const GetUsers = async()=>{
      try {
        const request = await get('/api/admin/getuser')
        const response = request.data;
        console.log("response", response)
      } catch (error) {
        console.log(error)
      }
    }
    GetUsers();
   },[])
  return (
    <div>
        <h1>Admin</h1>
    </div>
  )
}

export default Admin
