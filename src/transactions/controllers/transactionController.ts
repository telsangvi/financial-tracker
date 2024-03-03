import { Request, Response } from 'express';
import formatResponse from '../../utils';
import TransactionService from '../services/transactionService';

export default class TransactionController {
  static async addTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const { amount, date, category, description, type } = req.body;
    const result = await TransactionService.addTransaction(userId, {
      amount,
      date,
      category,
      description,
      type,
    });

    return formatResponse(result, res);
  }

  static async getAllTransactions(req: Request, res: Response) {
    const userId = req.user.id;
    const result = await TransactionService.getAllTransactions(userId);
    return formatResponse(result, res);
  }

  static async updateTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const { transactionId } = req.params;
    const updateData = req.body;
    const result = await TransactionService.updateTransaction(
      userId,
      transactionId,
      updateData,
    );

    return formatResponse(result, res);
  }

  static async deleteTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const { transactionId } = req.params;
    const result = await TransactionService.deleteTransaction(
      userId,
      transactionId,
    );

    return formatResponse(result, res);
  }
}
