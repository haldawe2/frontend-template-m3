import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div className='flex justify-start bg-slate-200  p-4'>
      <ul className='flex gap-5 w-full justify-start items-center'>
        <li><NavLink to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
      </ul>
      <button onClick={() => navigate(-1)} className='whitespace-nowrap'>Go back</button>
    </div>
  )
}
