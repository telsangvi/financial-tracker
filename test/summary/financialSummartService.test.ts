import { ObjectId } from 'mongodb';
import FinancialSummaryService from '../../src/summary/services/financialSummaryService';
import Transaction from '../../src/entities/Transaction';

// Mock the Transaction model
jest.mock('../../src/entities/Transaction', () => ({
    // Mock the find method for fetching transactions
    find: jest.fn(),
}));

describe('FinancialSummaryService', () => {
    const userId: ObjectId = new ObjectId();
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();
    });

    it('fetches financial summary successfully', async () => {
        // Mock transactions for the given user within the specified time period
        const mockTransactions = [
            { _id: new ObjectId(), amount: 100, type: 'income' },
            { _id: new ObjectId(), amount: 50, type: 'expense', category: 'Groceries' },
            { _id: new ObjectId(), amount: 75, type: 'expense', category: 'Utilities' },
        ];
        (Transaction.find as jest.Mock).mockResolvedValueOnce(mockTransactions);

        // Call the getFinancialSummary method
        const result = await FinancialSummaryService.getFinancialSummary(userId, startDate, endDate);

        // Expect the result to have the appropriate structure
        expect(result).toEqual({
            status: 200,
            isSuccess: true,
            message: 'Financial summary fetched',
            payload: {
                totalIncome: 100,
                totalExpenses: 125,
                balance: -25,
                insightsByCategory: {
                    Groceries: 50,
                    Utilities: 75,
                },
            },
        });

        // Ensure that the find method was called with the correct parameters
        expect(Transaction.find).toHaveBeenCalledWith({
            userReference: userId,
            date: { $gte: startDate, $lte: endDate },
        });
    });

    it('handles error when fetching financial summary', async () => {
        // Mock the find method to reject
        (Transaction.find as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

        // Call the getFinancialSummary method
        const result = await FinancialSummaryService.getFinancialSummary(userId, startDate, endDate);

        // Expect the result to have the appropriate structure
        expect(result).toEqual({
            status: 500,
            isSuccess: false,
            message: 'Internal server error',
            payload: {},
        });
    });
});
