"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { updateProject, deleteProject } from "@/redux/slices/projectSlice";

import { ProjectCardProps } from "@/types";
import TaskCard from "./TaskCard";

export default function ProjectCard({
  project,
  tasks,
  onAddTask,
  onStatusChange,
  onDelete,
}: ProjectCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [dueDate, setDueDate] = useState(project.dueDate || "");

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

  const resetForm = () => {
    setName(project.name);
    setDescription(project.description || "");
    setDueDate(project.dueDate || "");
  };

  const handleUpdate = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (name.trim().length === 0) {
      setNameError("Project name is required");
      return;
    }

    if (name.length > 50) {
      setNameError("Project name cannot exceed 50 characters");
      return;
    }
    if (description.length > 300) {
      setError("Description cannot exceed 300 characters");
      return;
    }

    if (!dueDate) {
      setDateError("Due date is required");
      return;
    }

    if (dueDate < today) {
      setDateError("Due date cannot be earlier than today");
      return;
    }

    if (dueDate > "2030-12-31") {
      setDateError("Due date cannot be after 31/12/2030");
      return;
    }

    const res = await fetch("/api/projects", {
      method: "PUT",
      body: JSON.stringify({
        id: project.id,
        name,
        description,
        dueDate,
      }),
    });

    const updated = await res.json();

    dispatch(updateProject(updated));

    setEditOpen(false);
  };

  const handleDelete = async () => {
    await fetch("/api/projects", {
      method: "DELETE",
      body: JSON.stringify({
        id: project.id,
      }),
    });

    dispatch(deleteProject(project.id));
  };

  return (
    <>
      <Accordion
        sx={{
          "&.Mui-expanded": {
            margin: 0,
          },
          boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="flex flex-col w-full">
            <Typography fontWeight="bold">{project.name}</Typography>

            {project.description && (
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {project.description}
              </Typography>
            )}

            {project.dueDate && (
              <Typography variant="caption">Due: {project.dueDate}</Typography>
            )}
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className="flex gap-2 mb-3">
            <Button variant="outlined" onClick={() => onAddTask(project)}>
              Add Task
            </Button>

            <Button variant="outlined" onClick={() => setEditOpen(true)}>
              Edit Project
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </div>

          <Typography variant="h6">All Tasks:</Typography>

          <div className="flex flex-col gap-4 mt-2">
            {projectTasks.length === 0 ? (
              <Typography color="text.secondary">No tasks listed</Typography>
            ) : (
              projectTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* EDIT PROJECT */}
      <Dialog
        open={editOpen}
        onClose={() => {
          resetForm();
          setEditOpen(false);
        }}
      >
        <DialogTitle>Edit Project</DialogTitle>

        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={Boolean(nameError)}
            helperText={nameError}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
            error={Boolean(error)}
            helperText={error}
          />

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
              max: "2030-12-31",
            }}
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              setDateError("");
            }}
            error={Boolean(dateError)}
            helperText={dateError}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              resetForm();
              setEditOpen(false);
            }}
          >
            Cancel
          </Button>

          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRM */}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        PaperProps={{
          sx: {
            width: "300px",
            maxWidth: "300px",
          },
        }}
      >
        <DialogTitle>Delete Project</DialogTitle>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
