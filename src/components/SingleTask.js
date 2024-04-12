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
      setIsRunning(false)
      setInputTime(totalTime)
      dispatch(totalTimeTaken({id: props.id, time: inputTime}))
  }

  const handleTaskComplete = () => {
    setIsTaskCompleted(!isTaskCompleted)
    const status = isTaskCompleted ? 'Inprogress' : 'Completed'
    dispatch(updateTaskStatus({id: props.id, status: status}))
    setIsRunning(false)
    
    const filteredOptions = isTaskCompleted
    ? props.selectedOptions.filter(option => option !== 'Completed')
    : props.selectedOptions

    dispatch(filterTasks({ options: filteredOptions })) 
  }
    
  const totalTime = formatTime(elapsedTime)
  const statusCheck = props.task.status === 'Completed' ? true : isTaskCompleted

  return (
    <div className="singleTask-container">
      <input className="checkbox-input mt-1" type="checkbox" name="taskComplete" checked={statusCheck} onChange={handleTaskComplete} />
      <p className="task-text">{props.task.text}</p>
      <button className={`${isRunning || statusCheck ? 'track-btns hide' : "track-btns"}`} onClick={handleStart}>Start Tracking</button>
      <button className={`${!isRunning || statusCheck ? 'track-btns hide' : "track-btns"}`} onClick={handleStop}>Stop Tracking</button>
      {isRunning && !statusCheck && <p className="time">{totalTime}</p>}
      {!isRunning && !statusCheck && <input type='text' className='time' value={inputTime} onChange={(e) => setInputTime(e.target.value)}/>}
      {statusCheck &&  <p className="time ms-4">Completed</p>}
    </div>
  )
}