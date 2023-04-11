import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup({ name: user.name, surname: user.surname, email: user.email, password });
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center h-[94vh] bg-blue-200 gap-y-6'>
        <div className='flex flex-col gap-y-4 text-center text-xl'>
          <label>Name</label>
          <input required type="text" name="name" value={user.name} onChange={handleChange} 
            className='rounded-lg p-2 w-[300px] focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-y-4 text-center text-xl'>
          <label>Surname</label>
          <input required type="text" name="surname" value={user.surname} onChange={handleChange} 
            className='rounded-lg p-2 w-[300px] focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-y-4 text-center text-xl'>
          <label>Email</label>
          <input required type="email" name="email" value={user.email} onChange={handleChange} 
            className='rounded-lg p-2 w-[300px] focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-y-4 text-center text-xl'>
          <label>Password</label>
          <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } 
            className='rounded-lg p-2 w-[300px] focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-y-4 text-center text-xl'>
          <label>Repeat the password</label>
          <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} 
            className='rounded-lg p-2 w-[300px] focus:outline-none'
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit"  className='flex h-14 w-28 bg-white items-center justify-center rounded-lg text-2xl'>Register</button>
      </form>
    </div>
  )
}
