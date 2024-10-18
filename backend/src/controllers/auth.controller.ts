import { Request, Response } from 'express';
import UserRepository from '../repositorys/user.repository';
import AuthService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

class AuthController {
  register = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { fullName, email, password } = req.body;

      const { user, token } = await authService.registerUser({
        fullName,
        email,
        password,
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user,
        token,
      });
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { email, password } = req.body;

      const { user, token } = await authService.loginUser(email, password);

      return res.status(200).json({
        message: 'Login Successful',
        user,
        token,
      });
    }
  );
}

export default new AuthController();
