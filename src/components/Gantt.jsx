import React, { useEffect, useState, useCallback } from 'react'
import { max, min, parseISO, format, eachDayOfInterval, add, sub } from 'date-fns'
import { useOutletContext } from "react-router-dom";

export default function Gantt() {

  const [tasks] = useOutletContext();
  const [tableReady, setTableReady] = useState(false);
  const [periodProject, setPeriodProject] = useState(null);
  const [tableData, setTableData] = useState(null);

  const setCalendarWidth = () => {
    //Checks latest and earlier start/end date on the array of tasks and adds a buffer of days on the sides
    if (tasks) {
      //Days on the sides of the calendar
      const buffer = 2;
      //Goes through the task array, maps only the dates, transforms them to Date object,
      //then uses min to find the earliest date, and sub to add the buffer
      const earliestDate = min(tasks.map(task => parseISO(task.startDate)));
      const latestDate = max(tasks.map(task => parseISO(task.endDate)));
      const earlyBuffer = sub(earliestDate, {days: buffer});
      const latestBuffer = add(latestDate, {days: buffer});
      //Creates an interval object that returns each day in between 2 dates
      const daysBetween = eachDayOfInterval({ start: earlyBuffer, end: latestBuffer});
      setPeriodProject(daysBetween);
    };
  };

  const drawTask = (task, index) => {
    //Get dates in same format ids on table are
    const startDate = format(parseISO(task.startDate), 'PP');
    const endDate = format(parseISO(task.endDate), 'PP');
    //Get x and y coordinates from the date headers
    const startPosition = document.getElementById(startDate);
    const startCoords = {
      x: startPosition.getBoundingClientRect().left,
      y: (startPosition.getBoundingClientRect().bottom + 10 + 50 * index)
    };
    const endPosition = document.getElementById(endDate);
    const endCoords = {
      x: endPosition.getBoundingClientRect().right
    };
    //Set up task div dimensions
    const width = endCoords.x - startCoords.x;
    const height = 30
    return (
      <div style={{position: "absolute",
        top: `${startCoords.y}px`, 
        left: `${startCoords.x}px`, 
        height: `${height}px`, 
        width:`${width}px`, 
        backgroundColor: 'lightblue'}}
        key={`${task._id}`}>{task.name}</div>
    )
  }

  useEffect(() => {
    setCalendarWidth();
    // eslint-disable-next-line
  }, [tasks]);

  const tableRendered = useCallback(table => {
    if (table !== null) {
      setTableData(table);
    };
  }, []);

  useEffect(() => {
    if (tableData) {
      setTableReady(true);
    };
  }, [tableData]);

  return (
    <div>
      {periodProject && 
      <table ref={tableRendered} className='w-4/5 h-[82vh] mx-auto my-8 border-solid border-2 border-black'>
        <thead>
          <tr>
            {periodProject.map(date => {
              return (
                <th key={format(date, 'PP')} id={`${format(date, 'PP')}`} className='border-solid border-2 border-black'>{format(date, 'PP')}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {periodProject.map(date => {
              return (
                <td key={format(date, 'PP')} className='border-solid border-2 border-black'></td>
              )
            })}
          </tr>
        </tbody>
      </table>}
      {tableReady && tasks.map((task, index) => drawTask(task, index))}
    </div>
  )
}
