import { IUser } from './user.interface';

export interface IUserResponseResponse {
  status: string;
  users: IUser[];
}
