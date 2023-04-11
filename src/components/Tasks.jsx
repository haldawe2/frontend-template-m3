import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { parseISO, format } from 'date-fns'
import AddTask from './AddTask';
import EditTask from './EditTask';

export default function Tasks() {

  const [tasks, project, getTasks] = useOutletContext();
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const drawTaskCard = (task) => {
    return (
      <div key={task._id} className='flex justify-between bg-slate-400 my-1'>
        <p className='mx-4' onClick={() => handleEditTask(task._id)}>{task.name}</p>
        <div className='flex gap-x-8 mx-4'>
          <p>{format(parseISO(task.startDate), 'PP')}</p>
          <p>{format(parseISO(task.endDate), 'PP')}</p>
        </div>
      </div>
    )
  };

  const handleEditTask = (id) => {
    setEditTask(id);
  }

  const handleAddTask = () => {
    setAddTask(true);
  }
  
  return (
    <div className='flex flex-col w-4/5 mx-auto'>
      {editTask && <EditTask setEditTask={setEditTask} project={project} getTasks={getTasks} tasks={tasks} taskId={editTask} />}
      {addTask && <AddTask setAddTask={setAddTask} project={project} getTasks={getTasks}/>}
      <div className=' bg-slate-300 my-2 flex justify-between items-center '>
        <p>In progress</p>
        <div className='cursor-pointer mx-4 p-2 font-bold' onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'in progress').map(task => drawTaskCard(task))}

      <div className=' bg-slate-300 my-2 flex justify-between items-center '>
        <p>Pending</p>
        <div className='cursor-pointer mx-4 p-2 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'pending').map(task => drawTaskCard(task))}

      <div className=' bg-slate-300 my-2 flex justify-between items-center '>
        <p>Complete</p>
        <div className='cursor-pointer mx-4 p-2 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'complete').map(task => drawTaskCard(task))}
    </div>
  )
}