import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';
import validateRequest from '../../middlewares/requestValidation';
import {
  RegisterUserRequest,
  AuthenticateUserRequest,
} from '../schema/userSchema';

const routes = express.Router();

/**
 * @route GET /user/register
 * @group User - Operations about user
 * @param {RegisterUserRequest.model} request.body.required - User information for registration
 * @returns {object} 201 - Success message and JWT token
 * @returns {Error} 200 - User already exists
 * @returns {Error} 500 - Internal Server Error
 */
routes.get('/register', async (req: Request, res: Response) => {
  validateRequest(RegisterUserRequest), UserController.registerUser(req, res);
});

/**
 * @route POST /user/login
 * @group User - Operations about user
 * @param {AuthenticateUserRequest.model} request.body.required - User credentials for authentication
 * @returns {object} 200 - Success message and JWT token
 * @returns {Error} 401 - Authentication failed. User not found.
 * @returns {Error} 500 - Internal Server Error
 */
routes.post('/login', async (req: Request, res: Response) => {
  validateRequest(AuthenticateUserRequest),
  UserController.authenticateUser(req, res);
});

export default routes;
