import express, { Request, Response } from 'express';

const routes = express.Router();

routes.get('/hello', async (req: Request, res: Response) => {
  const users = app.mongo.db.collection('users');
  try {
    const user = await users.findOne({ _id: '65e380e474a2663dfa526bf3' });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  res.status(201);
  res.json({ hello: 'world' });
});

export default routes;
