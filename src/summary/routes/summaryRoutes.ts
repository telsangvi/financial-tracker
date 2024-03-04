// financialSummaryRoutes.ts
import express, { Request, Response } from 'express';
import FinancialSummaryController from '../controllers/financialSummaryController';
import validateRequest from '../../middlewares/requestValidation';
import { FinancialSummaryRequest } from '../schema/summarySchema';

const routes = express.Router();

/**
 * @route GET /api/summary
 * @group Financial Summary - Operations related to financial summaries
 * @param {FinancialSummaryRequest.model} request.query.required - Request parameters for financial summary
 * @returns {object} 200 - Financial summary fetched successfully
 * @returns {Error} 400 - Bad Request (Validation error in request parameters)
 * @returns {Error} 500 - Internal Server Error
 */
routes.get('/', async (req: Request, res: Response) => {
  validateRequest(FinancialSummaryRequest),
  FinancialSummaryController.getFinancialSummary(req, res);
});

export default routes;
