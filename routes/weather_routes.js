import express from 'express';
import { getLastUpdate, getWeatherData, getWeatherRecord, addWeatherData, addWeatherRecord, updateWeatherRecord, deleteWeatherRecord } from '../controllers/weather_controllers.js';

const router = express.Router();

router  //TODO:  This should move to station controller
    .route('/getlastupdate/:id')
    .get(getLastUpdate);

router
    .route('/')
    .get(getWeatherData)
    .post(addWeatherData);

router
    .route('/:id')
    .get(getWeatherRecord)
    .post(addWeatherRecord)
    .patch(updateWeatherRecord)
    .delete(deleteWeatherRecord);

export default router;
