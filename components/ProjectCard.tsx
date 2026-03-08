"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ProjectCardProps } from "@/types";
import TaskCard from "./TaskCard";

export default function ProjectCard({
  project,
  tasks,
  onAddTask,
  onStatusChange,
  onDelete,
}: ProjectCardProps) {
  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <Accordion
      defaultExpanded
      sx={{
        "&.Mui-expanded": {
          margin: 0,
          boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        },
        boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex flex-col w-full">
          <Typography fontWeight="bold">{project.name}</Typography>

          {project.description && (
            <Typography variant="body2">{project.description}</Typography>
          )}

          {project.dueDate && (
            <Typography variant="caption">Due: {project.dueDate}</Typography>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <Button
          variant="outlined"
          className="mb-4"
          onClick={() => onAddTask(project)}
        >
          Add Task
        </Button>

        <Typography variant="h6" className="!mt-4">
          All Tasks:
        </Typography>
        <div className="flex flex-col gap-4">
          {projectTasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No tasks listed
            </Typography>
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
  );
}
