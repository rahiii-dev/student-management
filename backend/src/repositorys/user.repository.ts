import { Model } from 'mongoose';
import User, { IUser } from '../model/user.model';

class UserRepository {
  private readonly model: Model<IUser>;

  constructor() {
    this.model = User;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(`Error finding user with email: ${email}`);
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = new this.model(user);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user`);
    }
  }
}

export default UserRepository;
