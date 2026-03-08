"use client";

import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/redux/store";
import { setProjects } from "@/redux/slices/projectSlice";
import { setTasks } from "@/redux/slices/taskSlice";

import LogoutIcon from "@mui/icons-material/Logout";
import ProjectCard from "@/components/ProjectCard";
import TaskDialog from "@/components/TaskDialog";
import CreateProjectDialog from "@/components/CreateProjectDialog";

import { Project } from "@/types";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  useAuth();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const projects = useSelector((state: RootState) => state.projects);

  const tasks = useSelector((state: RootState) => state.tasks);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectDialog, setProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    const res = await fetch("/api/projects");

    const data = await res.json();

    dispatch(setProjects(data));
  };

  const openEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectDialog(true);
  };

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");

    const data = await res.json();

    dispatch(setTasks(data));
  };

  const openTaskDialog = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    router.push("/login");
  };

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <Typography variant="h6">Task Manager Dashboard</Typography>

          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => setConfirmLogout(true)}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* LOGOUT CONFIRMATION */}
      <Dialog open={confirmLogout} onClose={() => setConfirmLogout(false)}>
        <DialogTitle>Logout</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmLogout(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <div className="w-full py-4 mx-auto px-4 max-w-7xl">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Projects" value={totalProjects} />

          <StatsCard title="Total Tasks" value={totalTasks} />

          <StatsCard title="Completed Tasks" value={completedTasks} />

          <StatsCard title="Pending Tasks" value={pendingTasks} />
        </div>
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: 18,
                  sm: 24,
                },
              }}
            >
              Your Projects [{projects.length}]
            </Typography>

            <Button variant="contained" onClick={() => setProjectDialog(true)}>
              Create Project
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks}
              onAddTask={openTaskDialog}
              onStatusChange={() => {}}
              onDelete={() => {}}
              onEditProject={openEditProject}
            />
          ))}
        </div>
      </div>

      <CreateProjectDialog
        open={projectDialog}
        onClose={() => setProjectDialog(false)}
      />

      {selectedProject && (
        <TaskDialog
          open={dialogOpen}
          projectId={selectedProject.id}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
