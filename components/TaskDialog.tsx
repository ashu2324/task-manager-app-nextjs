"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { addTask } from "@/redux/slices/taskSlice";
import { AppDispatch } from "@/redux/store";

import { TaskDialogProps } from "@/types";

export default function TaskDialog({
  open,
  projectId,
  onClose,
}: TaskDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [tasks, setTasks] = useState([""]);

  const addTaskField = () => {
    setTasks([...tasks, ""]);
  };

  const removeTaskField = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const updateTaskField = (value: string, index: number) => {
    const updated = [...tasks];
    updated[index] = value;
    setTasks(updated);
  };

  const createTasks = async () => {
    const validTasks = tasks.filter((t) => t.trim() !== "");

    if (validTasks.length === 0) return;

    for (const title of validTasks) {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          projectId,
          status: "todo",
        }),
      });

      const newTask = await res.json();

      dispatch(addTask(newTask));
    }

    setTasks([""]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Tasks</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Add multiple tasks at once
        </Typography>

        {tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-2 mb-3">
            <TextField
              label={`Task ${index + 1}`}
              fullWidth
              value={task}
              onChange={(e) => updateTaskField(e.target.value, index)}
            />

            {tasks.length > 1 && (
              <IconButton color="error" onClick={() => removeTaskField(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}

        <Button startIcon={<AddIcon />} onClick={addTaskField} className="mt-2">
          Add Another Task
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={createTasks}>
          Create Tasks
        </Button>
      </DialogActions>
    </Dialog>
  );
}
