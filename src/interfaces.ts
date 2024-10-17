export interface ITask {
  _id: string;
  title: string;
  description: string;
  tag: string;
  initialDate: Date;
  endDate: Date;
  status?: 0 | 1 | 2;
}

export interface Content {
  "task.completed-label": string;
  "taks.mark-label": string;
  "task.delete-label": string;
}
