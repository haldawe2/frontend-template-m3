import React, { useState } from 'react'
import taskService from '../services/taskService';
import format from 'date-fns/format';

export default function AddTask({ setAddTask, project, getTasks }) {

  const [form, setForm] = useState({
    name: '',
    status: 'pending',
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
    setAddTask(false);
  }

  const handleSendTask = async (e) => {
    e.preventDefault();
    const taskToDB = {
      name: form.name,
      project: project._id,
      status: form.status,
      startDate: form.startDate,
      endDate: form.endDate
    }
    try {
      console.log(taskToDB)
      await taskService.create(taskToDB);
      await getTasks();
      handleClose();
    } catch (error) {
      console.error(error);
    };
  }

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/50 z-40" onClick={handleClose}></div>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#9DC7CC] border-2 
      rounded-lg border-gray-500 h-3/4 w-1/2 p-4 z-40'>
        <form onSubmit={handleSendTask} className='flex flex-col'>
          <button onClick={handleClose} type='button' className="flex h-8 w-14 bg-white items-center hover:bg-[#238995] hover:text-white duration-200
          justify-center rounded-lg cursor-pointer relative left-[90%]">Close</button>
          <input type='text' name='name' placeholder="NAME" value={form.name} onChange={handleForm}
          className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"></input>
          <select name='status' onChange={handleForm} 
          className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]">
            {/* {how to make "selected" appear conditionally} */}
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="complete">Complete</option>
          </select>
          <div className="flex gap-x-5 items-center justify-around my-8">
            <div className="flex gap-x-5 items-center my-6 justify-center">
              <label>Start date</label>
              <input type='date' name='startDate' value={form.startDate} onChange={handleForm}
              className="p-2 rounded-lg"></input>  
            </div>
            <div className="flex gap-x-5 items-center my-6 justify-center">
              <label>End date</label>
              <input type='date' name='endDate' value={form.endDate} onChange={handleForm}
              className="p-2 rounded-lg"></input>  
            </div>  
          </div>
          <input type="submit" value="Submit" className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
              hover:bg-[#238995] hover:text-white duration-200 relative top-24 left-1/2 transform -translate-x-1/2"></input>
        </form>
      </div>
    </>
  )
}