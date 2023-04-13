import React, { useEffect, useState } from 'react'
import { useParams, Outlet, NavLink, useLocation } from 'react-router-dom'
import projectService from '../services/projectService'
import taskService from '../services/taskService'


export default function Project() {

  const { projectId } = useParams();

  const location = useLocation();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);

  const getProject = async () => {
    const projectFromDB = await projectService.get(projectId);
    setProject(projectFromDB);
  };

  const getTasks = async () => {
    const tasksFromDB = await taskService.findByProject(projectId);
    setTasks(tasksFromDB);
  };

  useEffect(() => {
    getProject();
    getTasks();
    // eslint-disable-next-line
  }, [location]);
  
  return (
    <div className='bg-gradient-to-t from-[#25274D] to-[#076071] h-[94vh] w-[96vw] overflow-hidden'>
      <ul className='fixed flex justify-center gap-x-6 top-3 left-[50vw] mx-auto'>
        <li><NavLink to={`/project/${projectId}/tasks`}>Tasks</NavLink></li>
        <li><NavLink to={`/project/${projectId}/gantt`}>Gantt</NavLink></li>
      </ul>
      <Outlet context={[tasks, project, getTasks]} />
    </div>
  )
}