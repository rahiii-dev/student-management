import jwt from 'jsonwebtoken';
import { getEnvironmentConfig } from '../config/environment.config';

const { JWT_SECRET } = getEnvironmentConfig();

export default class JWTUtils {
  static generateToken(payload: object, expiresIn: string = '1h') {
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

  static decodeToken(token: string) {
    return jwt.decode(token);
  }
}
