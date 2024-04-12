import React, {useState} from "react";
import {Button} from 'react-bootstrap'
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { addTodayTask, filterTasks } from "../redux/TaskTrackerSlice";
import { DisplayTodayTask } from "./DisplayTodayTask";
import { FilterTasks } from "./FilterTasks";

export function SaveTask(){
    const [inputValue, setInputValue] = useState('')
    let [uniqueId, setUniqueId] = useState(0) 
    const {selectedOptions} = useSelector(state => state.taskTracker)
    const dispatch = useDispatch()
    const currentDateTime = format(new Date(), "MMMM do, h:mma")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKey = (e) => {
        if(e.key === 'Enter'){
            saveTask()
        }
    }
    const saveTask = () => {
        if(inputValue !== ''){
            dispatch(addTodayTask({
                id: uniqueId,
                text: inputValue,
                date: currentDateTime,
                status: 'Incomplete'
            }))
            setUniqueId(uniqueId+1)
            dispatch(filterTasks({options: selectedOptions}))
            setInputValue('')
        }
        else{
            alert('Please enter task description')
        }
    }
    
    return (
        <>
            <div className="page-background"></div>
            <div>
                <h1 className="date-time">{currentDateTime}</h1>
                <input 
                    type="text" 
                    placeholder="Add task..." 
                    name="task"
                    className="input-box" 
                    onKeyDown={handleKey}
                    value={inputValue} 
                    onChange={handleInputChange}
                ></input>
                <Button className="add-button mt-1 fw-bold" onClick={saveTask}>+</Button>
                <FilterTasks
                    selectedOptions={selectedOptions}
                />
                <DisplayTodayTask selectedOptions={selectedOptions}/>
                <Button className="close-day-btn">Mark my day closed</Button>
            </div>
        </>
    )
}