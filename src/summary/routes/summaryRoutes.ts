// financialSummaryRoutes.ts
import express, { Request, Response } from 'express';
import FinancialSummaryController from '../controllers/financialSummaryController';

const routes = express.Router();

routes.post('/', async (req: Request, res: Response) => {
  FinancialSummaryController.getFinancialSummary(req, res);
});

export default routes;
