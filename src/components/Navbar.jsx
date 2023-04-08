import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div className='flex justify-between bg-slate-200 py-4 px-8 ml-14'>
      <ul className='flex gap-5 justify-start items-center'>
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
