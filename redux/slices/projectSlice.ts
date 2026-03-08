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

    updateProject: (state, action) => {
      const index = state.findIndex(
        (project) => project.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;
