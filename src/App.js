import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Dashboard from './views/Dashboard';
import Workspace from './views/Workspace';
import Project from './views/Project';
import Gantt from './components/Gantt';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Sidebar/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route path="/workspace/:workspaceId" element={<IsPrivate><Workspace /></IsPrivate>} />
        <Route path="/project/:projectId" element={<IsPrivate><Project /></IsPrivate>} >
          <Route path="gantt" element={<Gantt />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
