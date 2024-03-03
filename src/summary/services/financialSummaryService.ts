import { ObjectId } from 'mongodb';
import Transaction from '../../entities/Transaction';

export default class FinancialSummaryService {
  public static async getFinancialSummary(
    userId: ObjectId,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    try {
      // Fetch transactions for the given user within the specified time period
      const transactions = await Transaction.find({
        userReference: userId,
        date: { $gte: startDate, $lte: endDate },
      });

      // Calculate total income, expenses, balance, and insights by category
      let totalIncome = 0;
      let totalExpenses = 0;
      const insightsByCategory: Record<string, number> = {};

      transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          totalIncome += transaction.amount;
        } else {
          totalExpenses += transaction.amount;

          // Group expenses by category
          const { category } = transaction;
          insightsByCategory[category] =
            (insightsByCategory[category] || 0) + transaction.amount;
        }
      });

      // Calculate balance
      const balance = totalIncome - totalExpenses;

      // Return the financial summary
      return {
        status: 200,
        isSuccess: true,
        message: 'Financial summary fetched',
        payload: {
          totalIncome,
          totalExpenses,
          balance,
          insightsByCategory,
        },
      };
    } catch (error) {
      console.error('Error fetching financial summary:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server error',
        payload: {},
      };
    }
  }
}
