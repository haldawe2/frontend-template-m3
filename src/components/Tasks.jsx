import React from 'react';
import { useOutletContext } from "react-router-dom";
import { parseISO, format } from 'date-fns'

export default function Tasks() {

  const [tasks] = useOutletContext();

  const drawTaskCard = (task) => {
    return (
    <div key={task._id} className='flex justify-between bg-slate-400 my-1'>
      <p className='mx-4'>{task.name}</p>
      <div className='flex gap-x-8 mx-4'>
        <p>{format(parseISO(task.startDate), 'PP')}</p>
        <p>{format(parseISO(task.endDate), 'PP')}</p>
      </div>
    </div>
    )
  };
  
  return (
    <div className='flex flex-col w-4/5 mx-auto'>
      <div className=' bg-slate-300 my-2'>In progress</div>
      {tasks && tasks.filter(task => task.status === 'in progress').map(task => drawTaskCard(task))}

      <div className=' bg-slate-300 my-2'>Pending</div>
      {tasks && tasks.filter(task => task.status === 'pending').map(task => drawTaskCard(task))}
      
      <div className=' bg-slate-300 my-2'>Done</div>
      {tasks && tasks.filter(task => task.status === 'done').map(task => drawTaskCard(task))}
    </div>
  )
}