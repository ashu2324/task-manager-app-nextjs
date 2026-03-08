import { Task } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Task[] = [];

const taskSlice = createSlice({
 name: "tasks",
 initialState,
 reducers: {

  setTasks: (state, action) => {
   return action.payload;
  },

  addTask: (state, action) => {
   state.push(action.payload);
  },

  updateTask: (state, action) => {

   const index = state.findIndex(
    (task) => task.id === action.payload.id
   );

   if (index !== -1) {
    state[index] = action.payload;
   }

  },

  deleteTask: (state, action) => {
   return state.filter(
    (task) => task.id !== action.payload
   );
  },

 },
});

export const {
 setTasks,
 addTask,
 updateTask,
 deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;