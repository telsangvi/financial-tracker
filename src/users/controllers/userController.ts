import { Request, Response } from 'express';
import formatResponse from '../../utils';
import UserService from '../services/userService';

export default class UserController {
  static async registerUser(req: Request, res: Response) {
    const result = await UserService.registerUser(
      req.body.username,
      req.body.email,
      req.body.password,
    );
    if (result.status === 200) {
      res.cookie('x-authorization', result?.payload, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      delete result.payload;
    }
    return formatResponse(result, res);
  }

  static async authenticateUser(req: Request, res: Response) {
    const result = await UserService.authenticateUser(
      req.body.email,
      req.body.password,
    );
    if (result.status === 200) {
      res.cookie('x-authorization', result?.payload, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      delete result.payload;
    }
    return formatResponse(result, res);
  }
}
