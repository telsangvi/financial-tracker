import express from 'express';
import usersRoutes from './users/routes/userRoutes';
import transactionsRoutes from './transactions/routes/transactionsRoutes';
import categoriesRoutes from './categories/routes/categoriesRoutes';
import summaryRoutes from './summary/routes/summaryRoutes';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/transactions', transactionsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/summary', summaryRoutes);

export default routes;
