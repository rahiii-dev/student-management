import jwt, { JwtPayload } from 'jsonwebtoken';
import { getEnvironmentConfig } from '../config/environment.config';
import { UserRole } from '../model/user.model';
import { UserId } from '../interfaces/user.interface';

const { JWT_SECRET } = getEnvironmentConfig();

interface IPayloads extends JwtPayload {
  userId: UserId;
  role: UserRole;
}

export default class JWTUtils {
  static generateToken(payload: IPayloads, expiresIn: string = '1h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  static verifyToken(token: string) {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  static decodeToken(token: string): IPayloads | null {
    return jwt.decode(token) as IPayloads;
  }
}
