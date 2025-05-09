import React from 'react'
import { post } from '../services/ApiEndpoint'


function Logout() {
    const handleLogout=async()=>{
        try {
            const request = await post('/api/auth/logout')
            const response = request.data;
            console.log("response", response)
        } catch (error) {
            console.log("error", error)
        }
    }

  return (
    <>
        <h1>Logout</h1>
        <button onClick={handleLogout}>
            Logout
        </button>
    </>
  )
}

export default Logout
