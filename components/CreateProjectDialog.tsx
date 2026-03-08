"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { CreateProjectDialogProps, Project } from "@/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addProject } from "@/redux/slices/projectSlice";

export default function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const createProject = async () => {
  if (!name || !dueDate) return;

  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      dueDate,
    }),
  });

  const newProject: Project = await res.json();

  dispatch(addProject(newProject));

  setName("");
  setDescription("");
  setDueDate("");

  onClose();
};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Project</DialogTitle>

      <DialogContent>
        <TextField
          label="Project Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Description (optional)"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Due Date"
          type="date"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={createProject}
          disabled={!name || !dueDate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
