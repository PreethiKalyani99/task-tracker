import React, {useState} from "react";
import {Button} from 'react-bootstrap'
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addTodayTask } from "../redux/TaskTrackerSlice";
import { DisplayTodayTask } from "./DisplayTodayTask";

export function SaveTask(){
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()
    const currentDateTime = format(new Date(), "MMMM do, h:mma")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const saveTask = (e) => {
        if(inputValue !== ''){
            dispatch(addTodayTask({
                text: inputValue,
                date: currentDateTime,
                status: 'Incomplete'
            }))
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
                    value={inputValue} 
                    onChange={handleInputChange}
                ></input>
                <Button className="add-button mt-1 fw-bold" onClick={saveTask}>+</Button>
                <DisplayTodayTask/>
                <Button className="close-day-btn">Mark my day closed</Button>
            </div>
        </>
    )
}