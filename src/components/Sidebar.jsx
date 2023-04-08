import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export default function Sidebar() {

  const { user } = useAuth();

  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    if (user) {
      const initials = user.name[0].toUpperCase() + user.surname[0].toUpperCase();
      setUserInitials(initials);
    }
  }, [user])
  

  return (
    <>
      <div className='bg-gray-800 w-[4vw] h-full absolute text-white flex flex-col items-center gap-y-2 z-40 peer'>
        {userInitials && <div className='rounded-[50%] bg-white w-12 h-12 flex items-center justify-center my-2'>
          <p className='text-black'>{userInitials}</p>  
        </div>}
        <Link to={"/"}><FontAwesomeIcon icon={faBriefcase} style={{color: "#ffffff",}} size="2xl" className='my-5 h-12' /></Link>
      </div>
      {userInitials && <div className='h-full absolute w-[18vw] z-30 h-full bg-gray-800 gap-y-2 
        -translate-x-[16vw] peer-hover:translate-x-0 hover:translate-x-0 duration-150'>
          <p className='text-white flex items-center mx-[5vw] h-12 my-2'>{`${user.name} ${user.surname}`}</p>
          <p className='text-white flex items-center mx-[5vw] h-12 my-7'><Link to={"/"}>Workspaces</Link></p>
      </div>}
    </>
  )
}