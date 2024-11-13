import { Router } from 'express';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from './doctors.controller';

const router = Router();

router.get('/', getDoctors);
router.post('/', createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);


export default router;