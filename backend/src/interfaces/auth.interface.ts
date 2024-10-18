import { Request } from 'express';
import { UserRole } from '../model/user.model';
import { UserId } from './user.interface';

export interface AuthRequest extends Request {
  user?: {
    id: UserId;
    role: UserRole;
  };
}
