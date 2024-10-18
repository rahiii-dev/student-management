import { Document, model, Schema } from 'mongoose';
import { UserId } from '../interfaces/user.interface';

export type UserRole = 'student' | 'teacher';

export interface IUser extends Document {
  _id: UserId;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userModel: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userModel);

export default User;
