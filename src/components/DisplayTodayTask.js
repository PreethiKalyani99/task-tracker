import React from "react";
import { useSelector } from 'react-redux';
import { SingleTask } from "./SingleTask";

export function DisplayTodayTask(){
    const { todayTasks, totalTimeForATask } = useSelector(state => state.taskTracker)
    
    return(
        <>
            <div className="display-page">
                {todayTasks.length > 0 && todayTasks.map((task, index) => {
                    return (
                       <SingleTask
                          key={index}
                          task={task}  
                          id={index}
                          totalTimeForATask={totalTimeForATask}
                       />
                    )
                })}
            </div>
        </>
    )
}