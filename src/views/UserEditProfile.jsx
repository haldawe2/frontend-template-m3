import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import userService from '../services/userService';
import authService from '../services/authService';

export default function UserEditProfile() {

  const { user, authenticateUser, storeToken } = useAuth();

  const [form, setForm] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password1: '',
    password2: ''
  });

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm(prev => {
      return ({...prev,
        [e.target.name] : e.target.value}
      )
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.email === "" ||
      form.password1 === "" ||
      form.password2 === "" ||
      form.name === "" ||
      form.surname === ""
    ) {
      setError("Must fill all required fields");
      return;
    } else {  
      setError(false);
    }
    if (form.password1 !== form.password2) {
      setError("Passwords do not match");
      return;
    } else {
      setError(false);
    }
    const userForDB = {
      name: form.name,
      surname: form.surname,
      email: form.email,
      password1: form.password1,
      password2: form.password2
    }
    const userID = user._id;
    try {
      await userService.edit(userForDB, userID);
      localStorage.removeItem('authToken');
      const response = await authService.login({ email: userForDB.email, password: userForDB.password1 });
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate('/profile');
        toast.success("Profile updated!");
      } else {
        setError("Unable to authenticate user");
      }
    } catch (error) {
      setError("Unable to update user");
    }
  };

  return (
    <div onSubmit={handleSubmit} className='flex gap-x-8 py-8 z-0 bg-gradient-to-t from-[#25274D] to-[#076071] h-[94vh] w-[96vw]'>
      {user && <form className='flex flex-col mx-auto items-center text-2xl gap-y-10'>
        <div className='flex flex-col gap-y-5'>
          <label className='text-white'>Full name:</label>
            <input type='text' onChange={handleForm} name='name' value={form.name} required className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-4'></input>
            <input type='text' onChange={handleForm} name='surname' value={form.surname} required className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-4'></input> 
        </div>
        <div className='flex flex-col gap-y-5'>
          <label className='text-white'>Email:</label>
          <input type='text' onChange={handleForm} name='email' value={form.email} required className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-4'></input>
        </div>
        <div className='flex flex-col gap-y-5'>
          <label className='text-white'>Password:</label>
          <input type='password' onChange={handleForm} placeholder='PASSWORD' name='password1' value={form.password1} required className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-4'></input>
          <input type='password' onChange={handleForm} placeholder='CONFIRM PASSWORD' name='password2' value={form.password2} required className='border-2 rounded-lg border-[#2E9CCA] bg-white p-1 px-4'></input>
        </div>
        <div className='flex gap-x-20 my-10'>
          <button type='submit' className='border-2 rounded-lg border-[#2E9CCA] 
            bg-white p-1 px-8 hover:text-white hover:bg-[#2E9CCA] duration-200'>Submit</button>
        </div>
      </form>}
    </div>
  )
}