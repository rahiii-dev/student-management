import { model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id: string | Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
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
