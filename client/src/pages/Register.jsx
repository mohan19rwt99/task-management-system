import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { post } from "../services/ApiEndpoint";
import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmit = async(e) => {
    e.preventDefault();
  
    try {
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;
  
     if(request.status == 200){
      toast.success(response.message)
     }
  
      // Reset the form only after the registration is successful
      setName('');
      setEmail('');
      setPassword('');
      
      console.log("response",response);
    } catch (error) {
      console.log(error);
  
      if (error.response?.status === 401) {
        toast.error("This email is already registered", {
          position: 'top-center',
          duration: 3000,
        });
      } else {
        toast.error(error.response?.data?.message || 'Registration failed', {
          position: 'top-center',
          duration: 3000,
        });
      }
    }
  }
  
  return (
   <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          Create an account
        </h1>
        
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required
              minLength="3"
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              required
              minLength="6"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>
          
         
          
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create an account
          </button>
          
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <Link className='text-blue-500' to={'/login'}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
   </>
  )
}

export default Register
