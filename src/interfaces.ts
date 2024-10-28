export interface ITask {
  _id: string;
  title: string;
  description: string;
  tag: string;
  initialDate: Date;
  endDate: Date;
  status?: 0 | 1 | 2;
}

export interface ITaskInput {
  title: string;
  description: string;
  tag: string;
  initialDate: string;
  endDate: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export interface Dashboard {
  completedTasks: number;
  pendingTasks: number;
  activeTasks: number;
  nextPendingTask: ITask | null;
  nextTask: ITask | null;
  recentCompletedTask: ITask | null;
  tasksPerDayArray: TasksPerDayArray[];
}

export interface TasksPerDayArray {
  date: string;
  count: number;
  tasks: ITask[];
}

interface Sidebar {
  dashboard: string;
  tasks: string;
  settings: string;
}

interface Labels {
  taskDelete: string;
  taskMark: string;
  taskMarked: string;
  email: string;
  password: string;
  name: string;
}

interface Login {
  title: string;
  action: string;
  link: string;
}

interface Register {
  title: string;
  action: string;
  link: string;
}

interface Invalid {
  email: string;
  password: string;
  match: string;
}

interface Fallback {
  message: string;
}

export interface Content {
  sidebar: Sidebar;
  labels: Labels;
  login: Login;
  register: Register;
  invalid: Invalid;
  fallback: Fallback;
}
