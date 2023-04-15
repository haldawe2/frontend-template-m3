import React, { useState } from 'react'
import taskService from '../services/taskService';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default function EditTask({ setEditTask, project, getTasks, tasks, taskId }) {

  const seletedTask = tasks.filter(task => task._id === taskId);
  const initialForm = {
    name: seletedTask[0].name,
    status: seletedTask[0].status,
    startDate: format(parseISO(seletedTask[0].startDate), "yyyy-MM-dd"),
    plannedStartDate: format(parseISO(seletedTask[0].plannedStartDate), "yyyy-MM-dd"),
    endDate: format(parseISO(seletedTask[0].endDate), "yyyy-MM-dd"),
    plannedEndDate: format(parseISO(seletedTask[0].plannedEndDate), "yyyy-MM-dd")
  }

  const [form, setForm] = useState(initialForm);

  const handleForm = (e) => {
    setForm(prev => {
      return (
        {...prev,
        [e.target.name]: e.target.value}
      )
    })
  };

  const handleClose = () => {
    setEditTask(false);
  }

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.delete(taskId);
      await getTasks();
      handleClose();
    } catch (error) {
      console.error(error);
    };
  };

  const handleSendTask = async (e) => {
    e.preventDefault();
    const taskToDB = {
      name: form.name,
      project: project._id,
      status: form.status,
      startDate: form.startDate,
      plannedStartDate: form.plannedStartDate,
      endDate: form.endDate,
      plannedEndDate: form.plannedEndDate
    }
    try {
      await taskService.edit(taskToDB, taskId);
      await getTasks();
      handleClose();
    } catch (error) {
      console.error(error);
    };
  }

  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#AAABB8] border-2 
    rounded-lg border-gray-500 h-3/4 w-1/2 p-4 z-40'>
      <form onSubmit={handleSendTask} className='flex flex-col'>
        <button onClick={handleClose} type='button' className="flex h-8 w-14 bg-white items-center 
          justify-center rounded-lg cursor-pointer relative left-[43vw]">Close</button>
        <input type='text' name='name' value={form.name} onChange={handleForm}
        placeholder="NAME" className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"></input>
        <select name='status' onChange={handleForm} className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="complete">Complete</option>
        </select>
        <div className="flex justify-center gap-x-[6vw] my-8 text-[1.2rem]">
          <div className="flex flex-col gap-x-5 items-center">
            <div className="flex gap-x-5 items-center my-2 justify-center">
              <label>Start date</label>
              <input type='date' name='startDate' value={form.startDate} onChange={handleForm}
              className="p-2 rounded-lg"></input>
            </div>
            <div className="flex gap-x-5 items-center my-2 justify-center">
              <label>Planned start</label>
              <input type='date' name='plannedStartDate' value={form.plannedStartDate} onChange={handleForm}
              className="p-2 rounded-lg"></input>  
            </div>
          </div>
          <div className="flex flex-col gap-x-5 items-center">
            <div className="flex gap-x-5 items-center my-2 justify-center">
              <label>End date</label>
              <input type='date' name='endDate' value={form.endDate} onChange={handleForm}
              className="p-2 rounded-lg"></input>
            </div>
            <div className="flex gap-x-5 items-center my-2 justify-center">
              <label>Planned end</label>
              <input type='date' name='plannedEndDate' value={form.plannedEndDate} onChange={handleForm}
              className="p-2 rounded-lg"></input> 
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-20 mt-[4vh]">
          <input type="submit" value="Submit" className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
            hover:bg-[#2E9CCA] hover:text-white duration-200"></input>
          <button type='button' onClick={handleDeleteTask} className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl
            hover:bg-[#2E9CCA] hover:text-white duration-200">Delete</button>  
        </div>
      </form>
    </div>
  )
}