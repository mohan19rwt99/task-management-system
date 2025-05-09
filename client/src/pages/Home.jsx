import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Home() {
  const user=useSelector((state)=>state.Auth)
  console.log('user',)
  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home
