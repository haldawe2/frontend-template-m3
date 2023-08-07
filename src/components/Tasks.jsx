import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { parseISO, format } from 'date-fns'
import AddTask from './AddTask';
import EditTask from './EditTask';

export default function Tasks() {

  const [tasks, project, getTasks] = useOutletContext();
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const statusStyle = "bg-[#9DC7CC] py-1 flex justify-between items-center text-xl text-white pl-8 mt-4" 

  const drawTaskCard = (task) => {

    let color;
    switch (task.status) {
      case "complete":
        color = "#05b605";
        break;
      case "pending":
        color = "#757d81";
        break;
      case "in progress":
        color = "#00BCD4";
        break;
      default:
        break;
    }

    return (
      <div key={task._id} className='flex justify-between py-2 border border-[#9DC7CC] bg-gray-100'>
        <div className='flex items-center'>
          <p className='mx-4 cursor-pointer' onClick={() => handleEditTask(task._id)}>{task.name}</p>
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
    <div className='flex flex-col mt-8 mx-16'>
      {editTask && <EditTask setEditTask={setEditTask} project={project} getTasks={getTasks} tasks={tasks} taskId={editTask} />}
      {addTask && <AddTask setAddTask={setAddTask} project={project} getTasks={getTasks}/>}
      <div className={statusStyle}>
        <p>In progress</p>
        <div className='cursor-pointer mx-4 p-1 font-bold' onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'in progress').map(task => drawTaskCard(task))}

      <div className={statusStyle}>
        <p>Pending</p>
        <div className='cursor-pointer mx-4 p-1 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'pending').map(task => drawTaskCard(task))}

      <div className={statusStyle}>
        <p>Complete</p>
        <div className='cursor-pointer mx-4 p-1 font-bold'  onClick={handleAddTask}>+</div>
      </div>
      {tasks && tasks.filter(task => task.status === 'complete').map(task => drawTaskCard(task))}
    </div>
  )
}