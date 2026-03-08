"use client";

import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateTask as updateTaskRedux,
  deleteTask as deleteTaskRedux,
} from "@/redux/slices/taskSlice";
import { AppDispatch } from "@/redux/store";

import { TaskCardProps, TaskStatus } from "@/types";

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const resetForm = () => {
    setTitle(task.title);
    setStatus(task.status);
  };

  const updateTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      body: JSON.stringify({
        id: task.id,
        title,
        status,
      }),
    });

    const updatedTask = await res.json();

    dispatch(updateTaskRedux(updatedTask));

    setOpen(false);
  };

  const deleteTask = async () => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({
        id: task.id,
      }),
    });

    dispatch(deleteTaskRedux(task.id));
  };

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition">
        <CardContent className="flex flex-col gap-4">
          <Typography fontWeight="bold">{task.title}</Typography>

          <Select
            size="small"
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value as TaskStatus;
              setStatus(newStatus);
              onStatusChange(task, newStatus);
            }}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>

          <div className="flex gap-2">
            <Tooltip title="View Task">
              <IconButton
                color="primary"
                onClick={() => {
                  setMode("view");
                  setTitle(task.title);
                  setStatus(task.status);
                  setOpen(true);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Update Task">
              <IconButton
                color="warning"
                onClick={() => {
                  setMode("edit");
                  setOpen(true);
                }}
              >
                <UpdateIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Task">
              <IconButton color="error" onClick={() => setConfirmDelete(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* DELETE CONFIRMATION */}

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete Task</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{task.title}</b> task?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              deleteTask();
              setConfirmDelete(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW / UPDATE */}

      <Dialog
        open={open}
        onClose={() => {
          resetForm();
          setOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Task Details</DialogTitle>

        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            value={title}
            disabled={mode === "view"}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            fullWidth
            value={status}
            disabled={mode === "view"}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="mt-4"
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
          >
            Cancel
          </Button>

          {mode === "edit" && (
            <Button variant="contained" onClick={updateTask}>
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
