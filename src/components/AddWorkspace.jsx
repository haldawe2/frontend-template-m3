import React, { useState } from 'react'
import workspaceService from '../services/workspaceService';

export default function AddWorkspace({ setCreateWorkspace, user, getWorkspaces }) {

  const [form, setForm] = useState({
    name: '',
    acronym: '',
    info: ''
  });

  const handleForm = (e) => {
    setForm(prev => {
      return (
        {...prev,
        [e.target.name]: e.target.value}
      ) 
    })
  };

  const handleClose = () => {
    setCreateWorkspace(false);
  }

  const handleSendWorkspace = async (e) => {
    e.preventDefault();
    const workspaceToDB = {
      name: form.name,
      acronym: form.acronym,
      info: form.info,
      founder: user._id
    }
    try {
      await workspaceService.create(workspaceToDB);
      await getWorkspaces();
      handleClose();
    } catch (error) {
      console.log(error);
    };
  }

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-200 h-3/4 w-1/2 p-4 z-40'>
      <form onSubmit={handleSendWorkspace} className='flex flex-col'>
        <button onClick={handleClose} type='button' className='cursor-pointer'>Close</button>
        <label>Name</label>
        <input type='text' name='name' value={form.name} onChange={handleForm}></input>
        <label>Acronym</label>
        <input type='text' name='acronym' value={form.acronym} onChange={handleForm}></input>
        <label>Info</label>
        <textarea name='info' value={form.info} onChange={handleForm}></textarea>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}