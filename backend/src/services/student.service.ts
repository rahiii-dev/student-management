import {
  UserResponse,
  UserId,
  IUserRegistration,
} from '../interfaces/user.interface';
import UserRepository from '../repositorys/user.repository';
import { AppError } from '../utils/errors/AppError';

class StudentService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getStudent(studentId: UserId): Promise<UserResponse> {
    const student = await this.userRepository.findUserById(studentId);
    if (!student) {
      throw new AppError('Student profile not found', 404);
    }
    const { password, ...otherData } = student.toObject();

    return otherData;
  }

  async getAllStudents(): Promise<UserResponse[]> {
    const students = await this.userRepository.findUsersByRole('student');
    return students ? students : [];
  }

  async updateStudent(
    studentId: UserId,
    studentDetails: Partial<IUserRegistration>
  ): Promise<UserResponse> {
    const student = await this.userRepository.findUserById(studentId);

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    if (studentDetails.email) {
      const existingUserWithEmail = await this.userRepository.findUserByEmail(
        studentDetails.email
      );

      if (
        existingUserWithEmail &&
        existingUserWithEmail._id.toString() !== studentId.toString()
      ) {
        throw new AppError('Email is already in use', 400);
      }
    }

    const updatedStudent = await this.userRepository.updateUser({
      _id: studentId,
      ...studentDetails,
    });

    return updatedStudent;
  }

  async deleteStudent(studentId: UserId): Promise<UserResponse> {
    const deletedStudent = await this.userRepository.deleteUser(studentId);

    if (!deletedStudent) {
      throw new AppError('Student profile not found', 404);
    }

    return deletedStudent;
  }
}

export default StudentService;
