import { Router } from 'express';
import {
  isAuthenticated,
  isStudent,
  isTeacher,
} from '../middlewares/auth.middleware';
import studentController from '../controllers/student.controller';

const router = Router();

// Student Routes
router.get('/', isAuthenticated, isStudent, studentController.getProfile);

// Teacher Routes
router.get(
  '/all',
  isAuthenticated,
  isTeacher,
  studentController.listAllStudents
);
router.get('/:id', isAuthenticated, isTeacher, studentController.getProfile);
router.put('/:id', isAuthenticated, isTeacher, studentController.updateStudent);
router.delete(
  '/:id',
  isAuthenticated,
  isTeacher,
  studentController.deleteStudent
);

export default router;
