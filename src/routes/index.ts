import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';

const routes = Router();

routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

export default routes;
