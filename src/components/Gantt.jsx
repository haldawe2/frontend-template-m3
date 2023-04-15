import React, { useEffect, useState, useCallback } from 'react'
import { max, min, parseISO, format, eachDayOfInterval, add, sub } from 'date-fns'
import { useOutletContext } from "react-router-dom";

export default function Gantt() {

  const [tasks] = useOutletContext();
  const [tableReady, setTableReady] = useState(false);
  const [periodProject, setPeriodProject] = useState(null);

  //For the tasks to be positioned when the Gantt is scrolled, the component needs to be rerendered again.
  //This updateState will be called only on a scroll event causing the rerender
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const setCalendarWidth = () => {
    //Checks latest and earlier start/end date on the array of tasks and adds a buffer of days on the sides
    if (tasks) {
      //Days on the sides of the calendar
      let buffer = 3;
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
      x: (startPosition.getBoundingClientRect().left + 5),
      y: (startPosition.getBoundingClientRect().bottom + 10 + 50 * index)
    };
    const endPosition = document.getElementById(endDate);
    const endCoords = {
      x: (endPosition.getBoundingClientRect().right - 5)
    };
    //Set up task div dimensions
    const width = endCoords.x - startCoords.x;
    const height = 30

    let color;
    switch (task.status) {
      case "complete":
        color = "#05b605";
        break;
      case "pending":
        color = "#757d81";
        break;
      case "in progress":
        color = "#00BCD4";
        break;
      default:
        break;
    }

    return (
      <div style={{position: "fixed",
        top: `${startCoords.y}px`, 
        left: `${startCoords.x}px`, 
        height: `${height}px`, 
        width:`${width}px`, 
        backgroundColor: `${color}`,
        zIndex: 0,
        borderRadius: "10px"}}
        className='flex items-center pl-5 text-xl text-white'
        key={`${task._id}`}>{task.name}</div>
    )
  }

  const drawDay = () => {

    const todayDate = format(new Date(), 'PP');
    const todayHour = format(new Date(), 'k');

    const startPosition = document.getElementById(todayDate);
    const coordsDay = {
      xStart: startPosition.getBoundingClientRect().left,
      xEnd: startPosition.getBoundingClientRect().right,
      y: startPosition.getBoundingClientRect().bottom + 1
    }
    console.log(coordsDay)
    const xPosition = coordsDay.xStart + (((coordsDay.xEnd-coordsDay.xStart)/24) * todayHour);
    console.log(xPosition)

    return (
      <div style={{ position: "fixed",
        top: `${coordsDay.y}px`, 
        left: `${xPosition}px`,
        height: "88.5%",
        width: "5px",
        backgroundColor: "#4e9df9",
        zIndex: 0}}></div>
    )
  };

  //Sets the days that will be shown on the Gantt
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      setCalendarWidth();
    }
    // eslint-disable-next-line
  }, [tasks]);

  //Starts rendering the tasks only once the table has been created 
  //(ref porperty on the table has html in it)
  const tableRendered = useCallback(table => {
    if (table !== null) {
      setTableReady(true);
    };
  }, []);

  return (
    <div className='h-[94vh] w-[96vw] overflow-hidden overflow-x-scroll' onScroll={forceUpdate}>
      {tasks && tasks.length <= 0 && <p className='text-center my-24 text-2xl'>Add a task to use the Gantt chart</p>}
      {tasks && tasks.length > 0 && periodProject && 
      <table ref={tableRendered} className='h-[100%] w-[100%]'>
        <thead>
          <tr>
            {periodProject.map(date => {
              return (
                <th key={format(date, 'PP')} id={`${format(date, 'PP')}`} 
                className='even:bg-gray-100 odd:bg-gray-300 outline outline-zinc-500 outline-[0.5px] z-30 min-w-[150px]'
                >
                  {format(date, 'PP')}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {periodProject.map(date => {
              return (
                <td key={format(date, 'PP')} className='even:bg-gray-100 odd:bg-gray-300'></td>
              )
            })}
          </tr>
        </tbody>
      </table>}
      {tableReady && tasks.map((task, index) => drawTask(task, index))}
      {tableReady && drawDay()}
    </div>
  )
}
