export type CreateProjectDialogProps = {
  open: boolean;
  onClose: () => void;
};

export type ProjectCardProps = {
  project: Project;
  tasks: Task[];
  onAddTask: (project: Project) => void;
  onStatusChange: (task: Task, status: string) => void;
  onDelete: (task: Task) => void;
};

export type StatsProps = {
  title: string;
  value: number;
};

export interface User {
  id: number
  email: string
  password: string
}

export type Project = {
  id: number;
  name: string;
  description?: string;
  dueDate?: string;
};

export interface Task {
  id: number;
  title: string;
  projectId: number;
  status: TaskStatus;
}

export interface TaskDialogProps {
  open: boolean;
  projectId: string | number;
  onClose: () => void;
  onTaskCreated: () => void;
}

export interface TaskCardProps {
  task: Task;
  onStatusChange: (task: Task, status: "todo" | "progress" | "done") => void;
  onDelete: (task: Task) => void;
}

export type TaskStatus = "todo" | "progress" | "done";

// slices
export interface AuthState {
 user: { id: string; name: string; email: string } | null;
 token: string | null;
}