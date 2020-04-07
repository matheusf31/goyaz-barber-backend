import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import ConcludedController from './app/controllers/ConcludedController';
import BanController from './app/controllers/BanController';
import UnavailableController from './app/controllers/UnavailableController';
import DayUnavailableController from './app/controllers/DayUnavailableController';

import authMiddleware from './app/middlewares/auth';
import bannedMiddleware from './app/middlewares/banned';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.use(bannedMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.post('/providers', ProviderController.store);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);
routes.post('/schedule', ScheduleController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/concluded', ConcludedController.index);
routes.post('/concluded/:id', ConcludedController.store);

routes.post('/ban/:id', BanController.store);
routes.delete('/ban/:id', BanController.delete);

routes.post('/unavailable', UnavailableController.store);
routes.delete('/unavailable', UnavailableController.delete);

routes.post('/daybusy', DayUnavailableController.store);
routes.delete('/daybusy', DayUnavailableController.delete);

export default routes;
