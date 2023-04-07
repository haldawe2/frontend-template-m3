import React, { useState } from 'react'
import projectService from '../services/projectService';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default function EditProject({ setEditProject, user, getWorkspace, project, workspace }) {

  const [form, setForm] = useState({
    name: project.name,
    acronym: project.acronym,
    info: project.info,
    startDate: format(parseISO(project.startDate), "yyyy-MM-dd"),
    plannedStartDate: format(parseISO(project.plannedStartDate), "yyyy-MM-dd"),
    endDate: format(parseISO(project.endDate), "yyyy-MM-dd"),
    plannedEndDate: format(parseISO(project.plannedEndDate), "yyyy-MM-dd"),
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
    setEditProject(false);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await projectService.delete(project._id);
      await getWorkspace();
      handleClose();
    } catch (error) {
      console.error(error);
    };
  };

  const handleSendProject = async (e) => {
    e.preventDefault();
    const projectToDB = {
      name: project.name,
      acronym: project.acronym,
      info: project.info,
      startDate: format(parseISO(project.startDate), "yyyy-MM-dd"),
      plannedStartDate: format(parseISO(project.plannedStartDate), "yyyy-MM-dd"),
      endDate: format(parseISO(project.endDate), "yyyy-MM-dd"),
      plannedEndDate: format(parseISO(project.plannedEndDate), "yyyy-MM-dd"),
      founder: user._id,
      workspace: workspace._id
    }
    try {
      await projectService.edit(projectToDB, project._id);
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
        <label>Planned start date</label>
        <input type='date' name='plannedStartDate' value={form.plannedStartDate} onChange={handleForm}></input>
        <label>End date</label>
        <input type='date' name='endDate' value={form.endDate} onChange={handleForm}></input>
        <label>Planned end date</label>
        <input type='date' name='plannedEndDate' value={form.plannedEndDate} onChange={handleForm}></input>
        <input type="submit" value="Submit"></input>
        <button type='button' onClick={handleDelete}>Delete</button>
      </form>
    </div>
  )
}