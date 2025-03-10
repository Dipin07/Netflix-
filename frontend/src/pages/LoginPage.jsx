import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {

   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = (e) => {
      e.preventDefault();
      console.log(email +" ", password);
      setEmail("")
      setPassword("")
    }

  return (

    <div className='h-screen w-full hero-bg'>

      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className='w-52' />
        </Link>
      </header>
      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg">
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>
          <form onSubmit={handleSignUp} className='space-y-4'>
            <div>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type="email"
                required
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-red-500'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input type="password"
                required
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:ring-red-500'
                id='password'
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
          hover-bg-red-700'>
              Sign Up
            </button>
          </form>

          <div className='text-center text-gray-400'>
            Don't have an account ?{" "}
            <Link to={"/signup"} className='text-red-500 hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}

export default LoginPage