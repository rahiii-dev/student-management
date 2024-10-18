import { Request, Response } from 'express';
import UserRepository from '../repositorys/user.repository';
import StudentService from '../services/student.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../interfaces/auth.interface';

const userRepository = new UserRepository();
const studentService = new StudentService(userRepository);

class StudenController {
  listAllStudents = asyncHandler(async (req: Request, res: Response) => {
    const students = await studentService.getAllStudents();
    res.json({ students });
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const studentId = req.params.id || req.user!.id;
    const student = await studentService.getStudent(studentId);
    res.json(student);
  });

  updateStudent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { fullName, email } = req.body;
    const studentId = req.params.id;
    const student = await studentService.updateStudent(studentId, {
      fullName,
      email,
    });
    res.json({
      message: 'Student Updated Sucessfully',
      data: student,
    });
  });

  deleteStudent = asyncHandler(async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const student = await studentService.deleteStudent(studentId);
    res.json({
      message: 'Student deleted Sucessfully',
      data: student,
    });
  });
}

export default new StudenController();
