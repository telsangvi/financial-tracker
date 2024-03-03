// src/app.ts
import Fastify from 'fastify';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import * as fastify_express from '@fastify/express';
import { ObjectId } from 'mongodb';
import routes from './router';
import connectToDatabase from './database';
import UserModel from './entities/User';

dotenv.config();

const app = Fastify({
  logger: true,
});

app.register(fastify_express).after(() => {
  app.use(express.json({ limit: '2mb' }));
  app.use(json());
  app.use(helmet());
  app.use(cookieParser.default());
  app.use(compression());
  app.use(cors({ credentials: true, origin: true }));
  app.use('/api', routes);
});

app.register(async (instance, opts, done) => {
  await connectToDatabase();
  done();
});

app.get('/hello', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      _id: new ObjectId('65e380e474a2663dfa526bf3'),
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
  res.status(201);
  res.json({ hello: 'world' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
