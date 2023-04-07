import React, { useState } from 'react'
import projectService from '../services/projectService';
import format from 'date-fns/format';

export default function AddProject({ setCreateProject, user, getWorkspace, workspace }) {

  const [form, setForm] = useState({
    name: '',
    acronym: '',
    info: '',
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd")
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
    setCreateProject(false);
  }

  const handleSendProject = async (e) => {
    e.preventDefault();
    const workspaceToDB = {
      name: form.name,
      acronym: form.acronym,
      info: form.info,
      founder: user._id,
      workspace: workspace._id,
      startDate: form.startDate,
      endDate: form.endDate
    }
    try {
      await projectService.create(workspaceToDB);
      await getWorkspace();
      handleClose();
    } catch (error) {
      console.log(error);
    };
  }

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-200 h-3/4 w-1/2 p-4 z-40'>
      <form onSubmit={handleSendProject} className='flex flex-col'>
        <button onClick={handleClose} type='button' className='cursor-pointer'>Close</button>
        <label>Name</label>
        <input type='text' name='name' value={form.name} onChange={handleForm}></input>
        <label>Acronym</label>
        <input type='text' name='acronym' value={form.acronym} onChange={handleForm}></input>
        <label>Info</label>
        <textarea name='info' value={form.info} onChange={handleForm}></textarea>
        <label>Start date</label>
        <input type='date' name='startDate' value={form.startDate} onChange={handleForm}></input>
        <label>End date</label>
        <input type='date' name='endDate' value={form.endDate} onChange={handleForm}></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}