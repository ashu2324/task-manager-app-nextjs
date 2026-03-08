"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
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

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  /* reset form */

  const resetForm = () => {
    setName("");
    setDescription("");
    setDueDate("");
    setError("");
  };

  /* handle cancel */
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  /* create project */
  const createProject = async () => {
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

    resetForm();

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Create Project</DialogTitle>

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
        <Button onClick={handleCancel}>Cancel</Button>

        <Button variant="contained" onClick={createProject}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
