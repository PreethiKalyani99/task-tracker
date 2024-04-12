import { configureStore } from "@reduxjs/toolkit";
import TaskTrackerSlice from "./TaskTrackerSlice";

export default configureStore({
    reducer: {
        taskTracker: TaskTrackerSlice 
    }
})