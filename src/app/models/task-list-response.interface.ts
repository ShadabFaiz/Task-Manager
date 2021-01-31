import { ITask } from './task.interface';

export interface ITaskListResponse {
  status: string;
  tasks: ITask[];
}
