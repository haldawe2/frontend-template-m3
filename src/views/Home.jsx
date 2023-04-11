import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-[94vh] bg-blue-300'>
      <h1 className='text-[12rem] text-white'>ProMa</h1>
      <p className='text-5xl text-white'>Project management made easy</p>
      <div className='flex gap-x-[10vw] my-[10vh]'>
        <Link to={'/login'} className='flex h-14 w-28 bg-white items-center justify-center rounded-lg text-2xl'>Log in</Link>
        <Link to={'/signup'} className='flex h-14 w-28 bg-white items-center justify-center rounded-lg text-2xl'>Sign up</Link>
      </div>
    </div>
  )
}
