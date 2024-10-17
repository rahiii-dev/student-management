import { Request, Response } from 'express';
import UserRepository from '../repositorys/user.repository';
import AuthService from '../services/auth.service';
import { IUser } from '../model/user.model';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        const { fullName, email, password } = req.body;
    
        try {
          const newUser: Omit<IUser, 'role'> = {
            fullName,
            email,
            password,
          };
    
          const user = await authService.registerUser(newUser);
    
          return res.status(201).json({
            message: 'User registered successfully',
            user,
          });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      }
    
      async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
    
        try {
          const data = await authService.loginUser(email, password);
    
          return res.status(200).json(data);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      }
}

export default AuthController
