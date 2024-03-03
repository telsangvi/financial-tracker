// financialSummaryRoutes.ts
import express, { Request, Response } from 'express';
import FinancialSummaryController from '../controllers/financialSummaryController';
import validateRequest from '../../middlewares/requestValidation';
import {FinancialSummaryRequest} from '../schema/summarySchema';

const routes = express.Router();

routes.get('/', async (req: Request, res: Response) => {
  validateRequest(FinancialSummaryRequest),
  FinancialSummaryController.getFinancialSummary(req, res);
});

export default routes;
