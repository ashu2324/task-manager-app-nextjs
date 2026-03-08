"use client";

import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TaskDialog from "../../components/TaskDialog";
import ProjectCard from "../../components/ProjectCard";
import StatsCard from "../../components/StatsCard";
import CreateProjectDialog from "../../components/CreateProjectDialog";

import LogoutIcon from "@mui/icons-material/Logout";

import { Project, Task } from "@/types";
import { AppDispatch, RootState } from "@/redux/store";

import { setProjects } from "@/redux/slices/projectSlice";
import { setTasks, updateTask, deleteTask } from "@/redux/slices/taskSlice";

export default function Dashboard() {
  useAuth();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /* ---------------- REDUX STATE ---------------- */

  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);

  /* ---------------- LOCAL UI STATE ---------------- */

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  /* ---------------- PROJECTS ---------------- */

  const loadProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();

    dispatch(setProjects(data));
  };

  /* ---------------- TASKS ---------------- */

  const loadTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    dispatch(setTasks(data));
  };

  /* ---------------- OPEN PROJECT DIALOG ---------------- */

  const createProject = () => {
    setOpenProjectDialog(true);
  };

  /* ---------------- TASK STATUS ---------------- */

  const handleStatusChange = async (task: Task, status: string) => {
    await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        status,
      }),
    });

    dispatch(updateTask({ ...task, status }));
  };

  /* ---------------- DELETE TASK ---------------- */

  const handleDelete = async (task: Task) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({
        id: task.id,
      }),
    });

    dispatch(deleteTask(task.id));
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    router.push("/login");
  };

  /* ---------------- OPEN TASK DIALOG ---------------- */

  const openTaskDialog = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    const init = async () => {
      await loadProjects();
      await loadTasks();
    };

    init();
  }, []);

  /* ---------------- STATS ---------------- */

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <AppBar position="static">
        <Toolbar className="flex justify-between">

          <Typography variant="h6">
            Task Manager Dashboard
          </Typography>

          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={() => setConfirmLogout(true)}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>

      {/* LOGOUT CONFIRMATION */}
      <Dialog open={confirmLogout} onClose={() => setConfirmLogout(false)}>

        <DialogTitle>
          Logout
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>

        <DialogActions>

          <Button onClick={() => setConfirmLogout(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </DialogActions>

      </Dialog>

      {/* PAGE */}
      <div className="w-full py-4 mx-auto px-4 max-w-7xl">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatsCard title="Total Projects" value={totalProjects} />

          <StatsCard title="Total Tasks" value={totalTasks} />

          <StatsCard
            title="Completed Tasks"
            value={completedTasks}
          />

          <StatsCard
            title="Pending Tasks"
            value={pendingTasks}
          />

        </div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 my-4">

          <Typography variant="h5" fontWeight="bold">
            Your Projects [{projects.length}]
          </Typography>

          <Button
            variant="contained"
            onClick={createProject}
          >
            + Create Project
          </Button>

        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              tasks={tasks}
              onAddTask={openTaskDialog}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}

        </div>

      </div>

      {/* PROJECT CREATION DIALOG */}
      <CreateProjectDialog
        open={openProjectDialog}
        onClose={() => setOpenProjectDialog(false)}
      />

      {/* TASK DIALOG */}
      {selectedProject && (
        <TaskDialog
          open={dialogOpen}
          projectId={selectedProject.id}
          onClose={() => setDialogOpen(false)}
          onTaskCreated={loadTasks}
        />
      )}

    </div>
  );
}