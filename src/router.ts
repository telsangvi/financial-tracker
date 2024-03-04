import express from 'express';
import usersRoutes from './users/routes/userRoutes';
import transactionsRoutes from './transactions/routes/transactionsRoutes';
import categoriesRoutes from './categories/routes/categoriesRoutes';
import summaryRoutes from './summary/routes/summaryRoutes';
import validateToken from './middlewares/tokenValidation';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/transactions', validateToken, transactionsRoutes);
routes.use('/categories', validateToken, categoriesRoutes);
routes.use('/summary', validateToken, summaryRoutes);

export default routes;
