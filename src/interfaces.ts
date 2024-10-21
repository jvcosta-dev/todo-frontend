export interface ITask {
  _id: string;
  title: string;
  description: string;
  tag: string;
  initialDate: Date;
  endDate: Date;
  status?: 0 | 1 | 2;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
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
}

interface Login {
  title: string;
  action: string;
  link: string;
}

interface Invalid {
  email: string;
  password: string;
}

export interface Content {
  sidebar: Sidebar;
  labels: Labels;
  login: Login;
  invalid: Invalid;
}
