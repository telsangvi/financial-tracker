import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';

const routes = express.Router();

routes.get('/register', async (req: Request, res: Response) => {
  UserController.registerUser(req, res);
});

routes.post('/login', async (req: Request, res: Response) => {
  UserController.authenticateUser(req, res);
});

export default routes;
