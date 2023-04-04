import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import workspaceService from '../services/workspaceService';

export default function Workspace() {

  const { workspaceId } = useParams(null);

  const [workspace, setWorkspace] = useState(null);

  const getWorkspace = async () => {
    const workspace = await workspaceService.get(workspaceId);
    setWorkspace(workspace);
  };

  useEffect(() => {
    getWorkspace();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      {workspace && workspace.projects.map((project) => {
        return (
          <Link to={`/project/${project._id}`} key={project._id} className='h-32 w-48 bg-zinc-400 flex items-center justify-center'><p>{project.name}</p></Link>
        )
      })}
    </div>
  )
}