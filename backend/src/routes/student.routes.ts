import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { validateStudent } from '../middleware/validation.middleware';

const router = Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudent);
router.post('/', validateStudent, studentController.createStudent);
router.put('/:id', validateStudent, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;