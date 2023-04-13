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

    let color;
    switch (task.status) {
      case "complete":
        color = "green";
        break;
      case "pending":
        color = "rgb(208, 17, 17)";
        break;
      case "in progress":
        color = "blue";
        break;
      default:
        break;
    }

    return (
      <div key={task._id} className='flex justify-between py-2 text-white bg-sky-950 outline-[0.5px] outline outline-zinc-500'>
        <div className='flex items-center'>
          <p className='mx-4' onClick={() => handleEditTask(task._id)}>{task.name}</p>
          <div className={`w-4 h-4 rounded-[50%]`} style={{ backgroundColor: `${color}`}}></div>
        </div>
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
    <div className='flex flex-col w-[96vw] ml-auto'>
      {editTask && <EditTask setEditTask={setEditTask} project={project} getTasks={getTasks} tasks={tasks} taskId={editTask} />}
      {addTask && <AddTask setAddTask={setAddTask} project={project} getTasks={getTasks}/>}
      <div className='bg-sky-800 py-1 flex justify-between items-center text-xl text-white pl-10 outline-[0.5px] outline outline-zinc-500'>
        <p>In progress</p>
        <div className='cursor-pointer mx-4 p-1 font-bold' onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'in progress').map(task => drawTaskCard(task))}

      <div className='bg-sky-800 py-1 flex justify-between items-center text-xl text-white mt-4 pl-10 outline-[0.5px] outline outline-zinc-500'>
        <p>Pending</p>
        <div className='cursor-pointer mx-4 p-1 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'pending').map(task => drawTaskCard(task))}

      <div className='bg-sky-800 py-1 flex justify-between items-center text-xl text-white mt-4 pl-10 outline-[0.5px] outline outline-zinc-500'>
        <p>Complete</p>
        <div className='cursor-pointer mx-4 p-1 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'complete').map(task => drawTaskCard(task))}
    </div>
  )
}