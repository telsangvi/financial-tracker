import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';
import validateRequest from '../../middlewares/requestValidation';
import { RegisterUserRequest, AuthenticateUserRequest } from '../schema/userSchema';

const routes = express.Router();

routes.get('/register', async (req: Request, res: Response) => {
  validateRequest(RegisterUserRequest),
  UserController.registerUser(req, res);
});

routes.post('/login', async (req: Request, res: Response) => {
  validateRequest(AuthenticateUserRequest),
  UserController.authenticateUser(req, res);
});

export default routes;
