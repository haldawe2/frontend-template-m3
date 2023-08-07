import React, { useState } from "react";
import workspaceService from "../services/workspaceService";

export default function AddWorkspace({
  setCreateWorkspace,
  user,
  getWorkspaces,
}) {
  const [form, setForm] = useState({
    name: "",
    acronym: "",
    info: "",
  });

  const handleForm = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setCreateWorkspace(false);
  };

  const handleSendWorkspace = async (e) => {
    e.preventDefault();
    const workspaceToDB = {
      name: form.name,
      acronym: form.acronym,
      info: form.info,
      founder: user._id,
    };
    try {
      await workspaceService.create(workspaceToDB);
      await getWorkspaces();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-gray-400/50 z-40" onClick={handleClose}></div>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#9DC7CC] border-2 
      rounded-lg border-gray-500 h-3/4 w-1/2 p-4 z-40"
      >
        <form onSubmit={handleSendWorkspace} className="flex flex-col">
          <button
            onClick={handleClose}
            type="button"
            className="flex h-8 w-14 bg-white items-center hover:bg-[#238995] hover:text-white duration-200
          justify-center rounded-lg cursor-pointer relative left-[90%]"
          >
            Close
          </button>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="NAME"
            onChange={handleForm}
            className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"
          ></input>
          <input
            type="text"
            name="acronym"
            value={form.acronym}
            placeholder="ACRONYM"
            onChange={handleForm}
            className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"
          ></input>
          <textarea
            name="info"
            value={form.info}
            placeholder="NOTES"
            onChange={handleForm}
            className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"
          ></textarea>
          <input
            type="submit"
            value="Create"
            className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
            hover:bg-[#238995] hover:text-white duration-200 relative top-28 left-1/2 transform -translate-x-1/2"
          ></input>
        </form>
      </div>
    </>
  );
}
