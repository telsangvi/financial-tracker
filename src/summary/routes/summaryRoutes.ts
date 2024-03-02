import express, { Request, Response } from 'express';

const routes = express.Router();

routes.get('/hello', (req: Request, res: Response) => {
  res.status(201);
  res.json({ hello: 'world' });
});

export default routes;
