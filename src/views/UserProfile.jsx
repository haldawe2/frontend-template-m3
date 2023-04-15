import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom';
import userService from '../services/userService';

export default function UserProfile() {

  const { user, logOutUser } = useAuth();

  const handleDeleteUser = async () => {
    const userId = user._id;
    try {
      await userService.delete(userId);
      logOutUser();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex gap-x-8 py-8 z-0 bg-gradient-to-t from-[#25274D] to-[#076071] h-[94vh] w-[96vw]'>
      {user && <div className='flex flex-col mx-auto items-center text-2xl gap-y-10'>
        <div className='flex flex-col'>
          <label className='text-white mb-5'>Full name:</label>
          <div className='flex gap-x-8'>
            <p className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-10'>{user.name}</p>
            <p className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-10'>{user.surname}</p> 
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-white mb-5'>Email:</label>
          <p className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-14'>{user.email}</p>
        </div>
        <div className='flex gap-x-20 my-10'>
          <Link to={'/profile/edit'} className='border-2 rounded-lg border-[#2E9CCA] 
            bg-white p-1 px-8 hover:text-white hover:bg-[#2E9CCA] duration-200'>Edit</Link>
          <button onClick={handleDeleteUser} className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-6
            hover:text-white hover:bg-red-600 duration-200'>Delete</button>
        </div>
      </div>}
    </div>
  )
}
