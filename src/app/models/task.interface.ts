import { USER_ID } from './user.interface';

export type Task_Priority = 1 | 2 | 3;

export interface ITask {
    message: string;
    due_date?: string;
    priority?: Task_Priority;
    assigned_to?: USER_ID;
}
