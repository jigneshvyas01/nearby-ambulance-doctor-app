import { Router } from 'express';
import { createAmbulance, deleteAmbulance, getAmbulances, updateAmbulance } from './ambulances.controller';

const router = Router();

router.get('/', getAmbulances);
router.post('/', createAmbulance);
router.put('/:id', updateAmbulance);
router.delete('/:id', deleteAmbulance);


export default router;