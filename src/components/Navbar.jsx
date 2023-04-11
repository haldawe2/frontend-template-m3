import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <div className='flex justify-between bg-slate-200 h-[6vh] px-8 pl-14'>
      <ul className='flex gap-5 justify-start items-center'>
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
      </ul>
      <button onClick={() => navigate(-1)} className='whitespace-nowrap'>Go back</button>
    </div>
  )
}
