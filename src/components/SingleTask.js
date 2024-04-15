import React, { useState, useRef, useEffect } from "react";
import { totalTimeTaken, updateTaskStatus, filterTasks } from "../redux/TaskTrackerSlice";
import { useDispatch } from 'react-redux';

export function SingleTask(props) {
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTaskCompleted, setIsTaskCompleted] = useState(false)
  const [inputTime, setInputTime] = useState('00:00:00')

  const dispatch = useDispatch()
  const intervalIdRef = useRef(null)

  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60))
    const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  
  useEffect(() => {
      if (isRunning) {
        intervalIdRef.current = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000) 
        }, 1000)
      } else {
          clearInterval(intervalIdRef.current)
          intervalIdRef.current = null 
      }
      return () => clearInterval(intervalIdRef.current)
  }, [isRunning])
    
  const handleStart = () => {
    dispatch(updateTaskStatus({id: props.id, status: 'Inprogress'}))
    dispatch(filterTasks({options: props.selectedOptions}))
    setIsRunning(true)
    if (!isTaskCompleted) {
      const [hours, minutes, seconds] = inputTime.split(":").map(Number)
      const inputTimeInMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000
      setElapsedTime(inputTimeInMs)
      setStartTime(Date.now() - inputTimeInMs)
    }
  }
    
  const handleStop = () => {
      setInputTime(totalTime)
      dispatch(totalTimeTaken({id: props.id, time: totalTime}))
      setIsRunning(false)
  }

  const handleTaskComplete = () => {
    setIsTaskCompleted(!isTaskCompleted)

    const status = isTaskCompleted ? 'Inprogress' : 'Completed'
    const timer = props.totalTimeForATask[props.id] === undefined ? '00:00:00' : props.totalTimeForATask[props.id]

    dispatch(updateTaskStatus({id: props.id, status: status}))
    setIsRunning(false)
    setInputTime(timer)
    dispatch(filterTasks({ options: props.selectedOptions })) 
  }
    
  const totalTime = formatTime(elapsedTime)
  const statusCheck = props.task.status === 'Completed' ? true : isTaskCompleted

  return (
    <div className="singleTask-container">
      <p className="mt-3 me-3 fw-bold">{props.index + 1}.</p>
      <p className="task-text mt-3">{props.task.text}</p>
      <button className={`${isRunning || statusCheck ? 'hide' : "track-btns"}`} onClick={handleStart}>Start Tracking</button>
      <button className={`${!isRunning || statusCheck ? 'hide' : "track-btns"}`} onClick={handleStop}>Stop Tracking</button>
      {isRunning && !statusCheck && <input disabled className="time" value={totalTime}></input>}
      {!isRunning && !statusCheck && <input type='text' className='time' value={inputTime} onChange={(e) => setInputTime(e.target.value)}/>}
      {statusCheck &&  <p className="time completed mt-2">COMPLETED</p>}
      <label className={statusCheck ? 'switch switch-margin' : "switch"}>
        <input className="" type="checkbox" name="taskComplete" checked={statusCheck} onChange={handleTaskComplete} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}