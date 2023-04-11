import React, { useEffect, useState } from 'react';
import workspaceService from '../services/workspaceService';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import AddWorkspace from '../components/AddWorkspace';
import EditWorkspace from '../components/EditWorkspace';

export default function Dashboard() {

  const { user } = useAuth();

  const [workspaces, setWorkspaces] = useState([]);
  const [createWorkspace, setCreateWorkspace] = useState(false);
  const [editWorkspace, setEditWorkspace] = useState(false);

  const getWorkspaces = async () => {
    if (user) {
      const workspacesFromDB = await workspaceService.findByUser(user._id);
      setWorkspaces(workspacesFromDB);
    };
  };

  const handleCreateWorkspace = () => {
    setCreateWorkspace(true);
  }

  const handleEditWorkspace = async (e, workspace) => {
    e.preventDefault();
    setEditWorkspace(workspace);
  }

  useEffect(() => {
    getWorkspaces();
    // eslint-disable-next-line
  }, [user]);
  
  return (
    <div className='flex items-center gap-x-8 m-10 z-0 ml-24'>
      {editWorkspace && <EditWorkspace 
        setEditWorkspace={setEditWorkspace} 
        user={user} 
        getWorkspaces={getWorkspaces} 
        workspace={editWorkspace}
      />}
      {createWorkspace && <AddWorkspace 
        setCreateWorkspace={setCreateWorkspace} 
        user={user} 
        getWorkspaces={getWorkspaces} 
      />}
      {user && workspaces.map((workspace) => {
          return (
            <div className='bg-gray-600 rounded-lg'>
              <Link to={`/workspace/${workspace._id}`} key={workspace._id} 
                className='w-[20vw] h-[25vh] flex border-2 rounded-lg border-gray-500 items-center 
                  justify-center relative hover:translate-x-1 hover:-translate-y-1 duration-100 bg-white'>
                <p className='text-xl'>{workspace.name}</p>
                <p className='absolute bottom-1 right-3 m-2' onClick={(e) => handleEditWorkspace(e, workspace)}>Edit</p>
              </Link>
            </div>
            
          )
        })
      }
      <div className='w-72 h-44 flex justify-center items-center' onClick={handleCreateWorkspace}>
        <p className='text-[60px]'>+</p>
      </div>
    </div>
  )
}