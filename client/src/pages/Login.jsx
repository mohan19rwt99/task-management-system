import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post("/api/auth/login", { email, password });
      const response = request.data;

      if (request.status === 200) {
        if(response.user.role == 'admin'){
            navigate('/admin')
        }else if(response.user.role == 'user'){
          navigate('/')
        }
        toast.success(response.message);
        dispatch(SetUser(response.user));
      }
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1" htmlFor="Email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
            <p className="mt-2 text-center">
              Not Registrered ?
              <Link className=" text-blue-500" to={"/register"}>
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
