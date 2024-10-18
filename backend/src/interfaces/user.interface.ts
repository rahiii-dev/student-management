import { Types } from 'mongoose';
import { IUser } from '../model/user.model';

export interface IUserRegistration {
  fullName: string;
  email: string;
  password: string;
}

export type UserResponse = Omit<IUser, 'password'>;

export type UserId = string | Types.ObjectId;
