import { Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Project[] = [];

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {

    setProjects: (state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.push(action.payload);
    },

    deleteProject: (state, action: PayloadAction<number>) => {
      return state.filter(
        (project) => project.id !== action.payload
      );
    },

  },
});

export const { setProjects, addProject, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;