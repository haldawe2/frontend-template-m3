import React, { useState } from "react";
import projectService from "../services/projectService";
import format from "date-fns/format";

export default function AddProject({
  setCreateProject,
  user,
  getWorkspace,
  workspace,
}) {
  const [form, setForm] = useState({
    name: "",
    acronym: "",
    info: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const handleForm = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setCreateProject(false);
  };

  const handleSendProject = async (e) => {
    e.preventDefault();
    const workspaceToDB = {
      name: form.name,
      acronym: form.acronym,
      info: form.info,
      founder: user._id,
      workspace: workspace._id,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    try {
      await projectService.create(workspaceToDB);
      await getWorkspace();
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
        <form onSubmit={handleSendProject} className="flex flex-col gap-y-8">
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
            className="rounded-lg p-1 mx-2 focus:outline-[#2E9CCA]"
          ></input>
          <input
            type="text"
            name="acronym"
            value={form.acronym}
            placeholder="ACRONYM"
            onChange={handleForm}
            className="rounded-lg p-1 mx-2 focus:outline-[#2E9CCA]"
          ></input>
          <textarea
            name="info"
            value={form.info}
            placeholder="NOTES"
            onChange={handleForm}
            className="rounded-lg p-1 mx-2 focus:outline-[#2E9CCA]"
          ></textarea>
          <div className="flex justify-center gap-x-[10vw] my-8 text-[1.2rem]">
            <div className="flex gap-x-5 items-center">
              <label>Start date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleForm}
                className="p-2 rounded-lg"
              ></input>
            </div>
            <div className="flex gap-x-5 items-center">
              <label>End date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleForm}
                className="p-2 rounded-lg"
              ></input>
            </div>
          </div>       
          <input
            type="submit"
            value="Create"
            className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
            hover:bg-[#238995] hover:text-white duration-200 relative top-8 left-1/2 transform -translate-x-1/2"
          ></input>
        </form>
      </div>
    </>
  );
}
