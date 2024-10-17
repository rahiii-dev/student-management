import { IUser } from '../model/user.model';
import UserRepository from '../repositorys/user.repository';
import bcrypt from 'bcryptjs';
import JWTUtils from '../utils/jwt.utils';

class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData: IUser): Promise<{user: IUser, token: string}> {
    const hashedPassword = await this.hashPassword(userData.password);
    const newUser = await this.userRepository.createUser({...userData, password: hashedPassword});
    const token = JWTUtils.generateToken({userId: newUser._id});
    return {
        user: newUser,
        token
    }
  }

  async loginUser(email: string, password: string): Promise<{user: IUser, token: string}> {
    const userData = await this.userRepository.findUserByEmail(email);
    if(!userData) {
        throw new Error('User not found');
    }

    const passswordVerified = this.validatePassword(password, userData.password)
    if(!passswordVerified) {
        throw new Error('Invalid credentials');
    }

    const token = JWTUtils.generateToken({userId: userData._id});

    return {
        user: userData,
        token,
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
}

export default AuthService;
