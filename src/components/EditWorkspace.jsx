import React, { useState } from "react";
import workspaceService from "../services/workspaceService";

export default function EditWorkspace({
  setEditWorkspace,
  user,
  getWorkspaces,
  workspace,
}) {
  const [form, setForm] = useState({
    name: workspace.name,
    acronym: workspace.acronym,
    info: workspace.info,
  });

  const handleForm = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setEditWorkspace(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await workspaceService.delete(workspace._id);
      await getWorkspaces();
      handleClose();
    } catch (error) {
      console.error(error);
    }
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
      await workspaceService.edit(workspaceToDB, workspace._id);
      await getWorkspaces();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#AAABB8] border-2 
      rounded-lg border-gray-500 h-3/4 w-1/2 p-4 z-40"
    >
      <form onSubmit={handleSendWorkspace} className="flex flex-col">
        <button
          onClick={handleClose}
          type="button"
          className="flex h-8 w-14 bg-white items-center 
          justify-center rounded-lg cursor-pointer relative left-[43vw]"
        >
          Close
        </button>
        {/* <label className="my-1">Name</label> */}
        <input
          type="text"
          name="name"
          placeholder="NAME"
          value={form.name}
          onChange={handleForm}
          className="rounded-lg p-1 mx-2 my-4 mt-8 focus:outline-[#2E9CCA]"
        ></input>
        <input
          type="text"
          name="acronym"
          placeholder="ACRONYM"
          value={form.acronym}
          onChange={handleForm}
          className="rounded-lg p-1 mx-2 my-4 focus:outline-[#2E9CCA]"
        ></input>
        <textarea
          name="info"
          onChange={handleForm}
          placeholder="NOTES"
          defaultValue={form.info}
          className="rounded-lg p-1 mx-2 my-4 focus:outline-[#2E9CCA]"
        />
        <div className="flex items-center justify-center gap-x-20 mt-[30vh]">
          <input
            type="submit"
            value="Submit"
            className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
            hover:bg-[#2E9CCA] hover:text-white duration-200"
          ></input>
          <button
            type="button"
            onClick={handleDelete}
            className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl
            hover:bg-[#2E9CCA] hover:text-white duration-200"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
