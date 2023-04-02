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
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input required type="text" name="name" value={user.name} onChange={handleChange} />
        <label>Surname</label>
        <input required type="text" name="surname" value={user.surname} onChange={handleChange} />
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
