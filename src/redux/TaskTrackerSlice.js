import { createSlice } from "@reduxjs/toolkit";

export const TaskTrackerSlice = createSlice({
    name: 'taskTracker',
    initialState:{
        todayTasks: [],
        totalTaskList: [],
        totalTimeForATask: {},
        filteredTasks: [],
        selectedOptions: ['Incomplete', 'Inprogress']
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
            const taskIndex = state.todayTasks.findIndex((task,index) => task.id === id)
            if(taskIndex !== -1){
                state.todayTasks[taskIndex].status = status
            }
        },
        filterTasks: (state, action) => {
            const {options} = action.payload
            let filtered_tasks = state.todayTasks.filter(task => options.includes(task.status))
            state.filteredTasks = filtered_tasks
        },
        updateOptions: (state, action) => {
            state.selectedOptions = action.payload
        }
    }
})

export const {addTodayTask, addTotalTaskList, totalTimeTaken, updateTaskStatus, filterTasks, updateOptions} = TaskTrackerSlice.actions
export default TaskTrackerSlice.reducer