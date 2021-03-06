import express from 'express';
import { getStationData, getStationRecord, addStationRecord, updateStationRecord, deleteStationRecord, login } from '../controllers/station_controllers.js';

const router = express.Router();

router
    .route('/')
    .get(getStationData)
    .post(addStationRecord);

router
    .route('/:id')
    .get(getStationRecord)
    .patch(updateStationRecord)
    .delete(deleteStationRecord);

router.post('/login', login);

export default router;
