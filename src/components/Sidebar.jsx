import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faIndustry,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import workspaceService from "../services/workspaceService";

export default function Sidebar() {
  const { user, logOutUser } = useAuth();

  const [userInitials, setUserInitials] = useState("");
  const [currentLocation, setCurrentLocation] = useState(false);
  const [projects, setProjects] = useState(false);

  const location = useLocation();

  const getProjects = async () => {
    try {
      const projectId = currentLocation.split('/')[2]
      const projectsFromDB = await workspaceService.findRelatedProjects(projectId);
      setProjects(projectsFromDB);
    } catch (error) {
      console.error(error)
    };
  };

  const setProjectsMenu = () => {
    const projectId = currentLocation.split('/')[2]
    const otherProjects = projects.filter(project => project._id !== projectId)
    const currentProject = projects.filter(project => project._id === projectId)[0]
    if (currentLocation.split('/')[1] !== "project") {
      return;
    }
    return (
      <>
        {projects && <div className="group my-3">
          <p className="text-white flex items-center mx-[5vw] h-12">{currentProject.name}</p>
          <div className="hidden group group-hover:block hover:block text-white flex items-center mx-[5vw]">
            {otherProjects.length === 0 && <p className="text-white h-12 flex items-center">No other projects</p>}
            {otherProjects.length > 0 && otherProjects.map(project => {
              return (
                <Link to={`/project/${project._id}`} key={project._id}
                className="text-white h-12 flex items-center">
                    {project.name}
                </Link>
              )
            })}
          </div>
        </div>}
      </>
      

    )
  }

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    if (currentLocation && currentLocation.split('/')[1] && currentLocation.split('/')[1] === "project") {
      getProjects();
    } else {
      setProjects(false);
    }
    // eslint-disable-next-line
  }, [currentLocation]);

  useEffect(() => {
    if (user) {
      const initials =
        user.name[0].toUpperCase() + user.surname[0].toUpperCase();
      setUserInitials(initials);
    }
  }, [user]);

  return (
    <>
      {user && <div className="bg-gray-800 w-[4vw] h-full absolute text-white flex flex-col items-center gap-y-2 z-40 peer">
        {userInitials && (
          <div className="rounded-[50%] bg-white w-12 h-12 flex items-center justify-center my-2">
            <p className="text-black">{userInitials}</p>
          </div>
        )}
        <Link to={"/"}>
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{ color: "#ffffff" }}
            size="2xl"
            className="my-5 h-12"
          />
        </Link>
        {projects && <FontAwesomeIcon
          icon={faIndustry}
          style={{ color: "#ffffff" }}
          size="2xl"
          className="my-5 h-12"
        />}
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ color: "#ffffff" }}
          size="2xl"
          className="my-5 h-12 mt-auto cursor-pointer"
          onClick={() => logOutUser()}
        />
      </div>}
      {user && userInitials && (
        <div
          className="h-full absolute w-[18vw] z-30 bg-gray-800 gap-y-2 flex flex-col
        -translate-x-[16vw] peer-hover:translate-x-0 hover:translate-x-0 duration-150"
        >
          <p className="text-white flex items-center mx-[5vw] h-12 my-2 cursor-pointer">
            Edit Profile
          </p>
          <p className="text-white flex items-center mx-[5vw] h-12 my-3">
            <Link to={"/dashboard"}>Workspaces</Link>
          </p>
          {projects && setProjectsMenu()}
          <p
            className="text-white flex items-center mx-[5vw] h-12 my-3 mt-auto cursor-pointer"
            onClick={() => logOutUser()}
          >
            Log out
          </p>
        </div>
      )}
    </>
  );
}