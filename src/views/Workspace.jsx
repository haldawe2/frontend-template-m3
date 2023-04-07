import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import workspaceService from '../services/workspaceService';
import projectService from '../services/projectService';
import { useAuth } from '../hooks/useAuth';
import AddProject from '../components/AddProject';
import EditProject from '../components/EditProject';

export default function Workspace() {

  const { workspaceId } = useParams();
  const { user } = useAuth();

  const [workspace, setWorkspace] = useState(null);
  const [projects, setProjects] = useState(null);
  const [createProject, setCreateProject] = useState(false);
  const [editProject, setEditProject] = useState(false);

  const getWorkspace = async () => {
    const projectsFromDB = await projectService.getFromWorkplace(workspaceId);
    const workspaceFromDB = await workspaceService.get(workspaceId);
    setWorkspace(workspaceFromDB);
    setProjects(projectsFromDB);
  };

  useEffect(() => {
    getWorkspace();
    // eslint-disable-next-line
  }, []);

  const handleCreateProject = () => {
    setCreateProject(true);
  }

  const handleEditProject = (e, project) => {
    e.preventDefault();
    setEditProject(project);
  }
  
  return (
    <div className='flex items-center gap-x-4 m-10 z-0'>
      {editProject && <EditProject 
        setEditProject={setEditProject}
        user={user}
        getWorkspace={getWorkspace}
        project={editProject}
        workspace={workspace}
      />}
      {createProject && <AddProject 
        setCreateProject={setCreateProject}
        user={user}
        getWorkspace={getWorkspace}
        workspace={workspace}
      />}
      {projects && projects.map((project) => {
        return (
          <Link to={`/project/${project._id}/tasks`} key={project._id} 
          className='w-72 h-44 flex bg-zinc-400 items-center justify-center relative'>
            <p>{project.name}</p>
            <p className='absolute bottom-1 right-3 m-2' onClick={(e) => handleEditProject(e, project)}>Edit</p>
          </Link>
        )
      })}
      <div className='w-72 h-44 flex justify-center items-center' onClick={handleCreateProject}>
        <p className='text-[60px]'>+</p>
      </div>
    </div>
  )
}