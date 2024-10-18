import { IUser } from '../model/user.model';
import UserRepository from '../repositorys/user.repository';
import bcrypt from 'bcryptjs';
import JWTUtils from '../utils/jwt.utils';
import { IUserRegistration } from '../interfaces/user.interface';
import { AppError } from '../utils/errors/AppError';

class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(
    userData: IUserRegistration
  ): Promise<{ user: IUser; token: string }> {
    const userExist = await this.userRepository.findUserByEmail(userData.email);
    if (userExist) {
      throw new AppError('User already exist', 400);
    }

    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
    const token = JWTUtils.generateToken({
      userId: newUser._id,
      role: newUser.role,
    });
    const { password, ...userDataWithoutPass } = newUser.toObject();
    return {
      user: userDataWithoutPass,
      token,
    };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: Omit<IUser, 'password'>; token: string }> {
    const userData = await this.userRepository.findUserByEmail(email);
    if (!userData) {
      throw new AppError('User not found', 400);
    }

    const passswordVerified = this.validatePassword(
      password,
      userData.password
    );
    if (!passswordVerified) {
      throw new AppError('Invalid credentials', 400);
    }

    const token = JWTUtils.generateToken({
      userId: userData._id,
      role: userData.role,
    });

    const { password: pass, ...userDataWithoutPass } = userData.toObject();

    return {
      user: userDataWithoutPass,
      token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(
    inputPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
}

export default AuthService;
