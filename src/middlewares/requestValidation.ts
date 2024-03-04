// requestValidationMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { Type } from 'typebox';

export default function validateRequest(
  bodySchema: Type,
  paramsSchema?: Type,
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction): void {
    try {
      if (bodySchema && req.body) {
        const validatedBody = Type.parse(bodySchema, req.body);
        req.body = validatedBody;
      }

      if (paramsSchema && req.params) {
        const validatedParams = Type.parse(paramsSchema, req.params);
        req.params = validatedParams;
      }

      next();
    } catch (error) {
      if (error instanceof Type.Error) {
        res.status(400).json({ error: 'bad request' });
      } else {
        console.error('Error in request validation middleware:', error);
        res.status(500).json({ error: 'Internal server error occurred' });
      }
    }
  };
}
