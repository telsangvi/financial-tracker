// financialSummaryController.ts
import { Request, Response } from 'express';
import FinancialSummaryService from '../services/financialSummaryService';
import formatResponse from '../../utils';

export default class FinancialSummaryController {
  static async getFinancialSummary(req: Request, res: Response) {
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const result = await FinancialSummaryService.getFinancialSummary(
      userId,
      startDate,
      endDate,
    );
    return formatResponse(result, res);
  }
}
