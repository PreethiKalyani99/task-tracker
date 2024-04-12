import { createSlice } from "@reduxjs/toolkit";

export const TaskTrackerSlice = createSlice({
    name: 'taskTracker',
    initialState:{
        todayTasks: [],
        totalTaskList: [],
        totalTimeForATask: {}
    },
    reducers: {
        addTodayTask: (state,action) => {
            state.todayTasks.push(action.payload)
        },
        addTotalTaskList: (state, action) => {
            state.totalTaskList.push(action.payload)
        },
        totalTimeTaken: (state, action) => {
            const { id, time } = action.payload
            state.totalTimeForATask[id] = time
        },
        updateTaskStatus: (state, action) => {
            const {id, status} = action.payload
            const taskIndex = state.todayTasks.findIndex((task,index) => index === id)
            if(taskIndex !== -1){
                state.todayTasks[taskIndex].status = status
            }
        }
    }
})

export const {addTodayTask, addTotalTaskList, totalTimeTaken, updateTaskStatus} = TaskTrackerSlice.actions
export default TaskTrackerSlice.reducer