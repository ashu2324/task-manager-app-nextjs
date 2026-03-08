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

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateTask as updateTaskRedux,
  deleteTask as deleteTaskRedux,
} from "@/redux/slices/taskSlice";

import { AppDispatch } from "@/redux/store";
import { TaskCardProps, TaskStatus } from "@/types";

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const resetForm = () => {
    setTaskTitle(task.title);
    setStatus(task.status);
  };

  const updateTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        taskTitle,
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
      headers: {
        "Content-Type": "application/json",
      },
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
          <Typography fontWeight="bold">{taskTitle}</Typography>

          {/* STATUS VIEW ONLY */}
          <Typography variant="body2" color="text.secondary">
            Status: {task.status.toUpperCase()}
          </Typography>

          <div className="flex gap-2">
            {/* UPDATE */}
            <Tooltip title="Update Task">
              <IconButton
                color="warning"
                onClick={() => {
                  // setTaskTitle(task.title);
                  // setStatus(task.status);
                  setOpen(true);
                }}
              >
                <ModeEditIcon />
              </IconButton>
            </Tooltip>

            {/* DELETE */}
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

      {/* UPDATE TASK */}

      <Dialog
        open={open}
        onClose={() => {
          setTaskTitle(taskTitle);
          setStatus(task.status);
          setOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Task</DialogTitle>

        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <Select
            fullWidth
            value={status}
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

          <Button variant="contained" onClick={updateTask}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
