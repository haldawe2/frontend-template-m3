import React, { useEffect, useState } from 'react';
import workspaceService from '../services/workspaceService';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Home() {

  const { user } = useAuth();

  const [workspaces, setWorkspaces] = useState([]);

  const getWorkspaces = async () => {
    if (user) {
      const workspacesFromDB = await workspaceService.findByUser(user._id);
      setWorkspaces(workspacesFromDB);
    };
  };

  useEffect(() => {
    getWorkspaces();
    // eslint-disable-next-line
  }, [user]);
  
  return (
    <div>
      {user && workspaces.map((workspace) => {
          return (
            <Link to={`/workspace/${workspace._id}`} key={workspace._id} className='py-16 flex w-72 bg-zinc-400 items-center justify-center'><p>{workspace.name}</p></Link>
          )
        })
      }
    </div>
  )
}