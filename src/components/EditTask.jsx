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
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-200 h-3/4 w-1/2'>
      <form onSubmit={handleSendTask} className='flex flex-col'>
        <button onClick={handleClose} type='button' className='cursor-pointer'>Close</button>
        <label>Name</label>
        <input type='text' name='name' value={form.name} onChange={handleForm}></input>
        <label>Status</label>
        <select name='status' onChange={handleForm}>
          {/* {how to make "selected" appear conditionally} */}
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="complete">Complete</option>
        </select>
        {/* <label>Notes</label>
        <textarea name='notes' value={form.notes}></textarea> */}
        {/* <label>Color</label>
        <input type='text'></input> */}
        {/* <label>Tags</label>
        <div>
          {form.tags.map(tag => {
            return (
              <div>{tag}</div>
            )
          })}
        </div>
        <label>Add tags</label>
        <input type='text' name='addTag' value={form.addTag}></input> */}
        <label>Start date</label>
        <input type='date' name='startDate' value={form.startDate} onChange={handleForm}></input>
        <label>Planned Start date</label>
        <input type='date' name='plannedStartDate' value={form.plannedStartDate} onChange={handleForm}></input>
        <label>End date</label>
        <input type='date' name='endDate' value={form.endDate} onChange={handleForm}></input>
        <label>Planned end date</label>
        <input type='date' name='plannedEndDate' value={form.plannedEndDate} onChange={handleForm}></input>
        <input type="submit" value="Submit"></input>
        <button type='button' onClick={handleDeleteTask}>Delete</button>
      </form>
    </div>
  )
}