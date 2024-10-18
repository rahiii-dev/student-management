import { Model } from 'mongoose';
import User, { IUser, UserRole } from '../model/user.model';
import { IUserRegistration, UserId } from '../interfaces/user.interface';
import { AppError } from '../utils/errors/AppError';

class UserRepository {
  private readonly model: Model<IUser>;

  constructor() {
    this.model = User;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new AppError(`Error finding user with email: ${email}`, 500);
    }
  }

  async findUserById(userId: UserId): Promise<IUser | null> {
    try {
      return await this.model.findById(userId);
    } catch (error) {
      throw new AppError('Error finding user by ID', 500);
    }
  }

  async findUsersByRole(role: UserRole): Promise<IUser[] | null> {
    try {
      return await this.model.find({ role }).select('-password');
    } catch (error) {
      throw new AppError('Error finding users by role', 500);
    }
  }

  async createUser(user: IUserRegistration): Promise<IUser> {
    try {
      const newUser = new this.model(user);
      return await newUser.save();
    } catch (error) {
      throw new AppError('Error creating user', 500);
    }
  }

  async updateUser(userDetails: Partial<IUser>): Promise<IUser> {
    try {
      const updatedUser = await this.model.findByIdAndUpdate(
        userDetails._id,
        userDetails,
        { new: true }
      );

      if (!updatedUser) {
        throw new AppError('User not found', 404);
      }

      return updatedUser;
    } catch (error) {
      throw new AppError('Error updating user', 500);
    }
  }

  async deleteUser(userId: UserId): Promise<IUser | null> {
    try {
      const deletedUser = await this.model.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new AppError('Error deleting user', 500);
    }
  }
}

export default UserRepository;
