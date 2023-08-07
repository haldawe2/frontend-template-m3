import React, { useState } from "react";
import projectService from "../services/projectService";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function EditProject({
  setEditProject,
  user,
  getWorkspace,
  project,
  workspace,
}) {
  const [form, setForm] = useState({
    name: project.name,
    acronym: project.acronym,
    info: project.info,
    startDate: format(parseISO(project.startDate), "yyyy-MM-dd"),
    plannedStartDate: format(parseISO(project.plannedStartDate), "yyyy-MM-dd"),
    endDate: format(parseISO(project.endDate), "yyyy-MM-dd"),
    plannedEndDate: format(parseISO(project.plannedEndDate), "yyyy-MM-dd"),
  });

  const handleForm = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClose = () => {
    setEditProject(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await projectService.delete(project._id);
      await getWorkspace();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendProject = async (e) => {
    e.preventDefault();
    const projectToDB = {
      name: project.name,
      acronym: project.acronym,
      info: project.info,
      startDate: format(parseISO(project.startDate), "yyyy-MM-dd"),
      plannedStartDate: format(
        parseISO(project.plannedStartDate),
        "yyyy-MM-dd"
      ),
      endDate: format(parseISO(project.endDate), "yyyy-MM-dd"),
      plannedEndDate: format(parseISO(project.plannedEndDate), "yyyy-MM-dd"),
      founder: user._id,
      workspace: workspace._id,
    };
    try {
      await projectService.edit(projectToDB, project._id);
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
        <form onSubmit={handleSendProject} className="flex flex-col gap-y-6">
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
          <div className="flex justify-center gap-x-[6vw] text-[1.2rem]">
            <div className="flex flex-col gap-x-5 items-center">
              <div className="flex gap-x-5 items-center my-2 justify-center">
                <label>Start date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleForm}
                  className="p-2 rounded-lg"
                ></input>
              </div>
              <div className="flex gap-x-5 items-center my-2 justify-center">
                <label>Planned start</label>
                <input
                  type="date"
                  name="plannedStartDate"
                  value={form.plannedStartDate}
                  onChange={handleForm}
                  className="p-2 rounded-lg"
                ></input>
              </div>
            </div>
            <div className="flex flex-col gap-x-5 items-center">
              <div className="flex gap-x-5 items-center my-2 justify-center">
                <label>End date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleForm}
                  className="p-2 rounded-lg"
                ></input>
              </div>
              <div className="flex gap-x-5 items-center my-2 justify-center">
                <label>Planned end</label>
                <input
                  type="date"
                  name="plannedEndDate"
                  value={form.plannedEndDate}
                  onChange={handleForm}
                  className="p-2 rounded-lg"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex fixed bottom-10 left-1/2 transform -translate-x-1/2 items-center justify-center gap-x-20">
            <input
              type="submit"
              value="Submit"
              className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl cursor-pointer
              hover:bg-[#238995] hover:text-white duration-200"
            ></input>
            <button
              type="button"
              onClick={handleDelete}
              className="flex h-10 w-28 bg-white items-center justify-center rounded-lg text-xl
            hover:bg-[#238995] hover:text-white duration-200"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
