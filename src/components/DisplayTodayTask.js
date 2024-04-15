import React from "react";
import { useSelector } from 'react-redux';
import { SingleTask } from "./SingleTask";

export function DisplayTodayTask(props){
    const { totalTimeForATask, filteredTasks, selectedOptions } = useSelector(state => state.taskTracker)
    
    return(
        <>
            <div className="display-page">
                {filteredTasks && filteredTasks.map((task, index) => {
                    return (
                       <SingleTask
                          key={task.id}
                          task={task}
                          index={index}  
                          id={task.id}
                          totalTimeForATask={totalTimeForATask}
                          selectedOptions={selectedOptions}
                          filteredTasks={filteredTasks}
                       />
                    )
                })}
            </div>
        </>
    )
}