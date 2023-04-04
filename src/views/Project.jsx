import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectService from '../services/projectService'
import taskService from '../services/taskService'

export default function Project() {

  const { projectId } = useParams();

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
  }, []);
  
  return (
    <div>
      {project && <p>{project.name}</p>}
      {tasks && <p>{tasks.length}</p>}
    </div>
  )
}