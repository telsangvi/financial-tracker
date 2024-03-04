import { ObjectId } from 'mongodb';
import TransactionService from '../../src/transactions/services/transactionService';
import Transaction from '../../src/entities/Transaction';

// Mock the Transaction model
jest.mock('../../src/entities/Transaction', () => ({
    // Mock the save method for creating a new transaction
    save: jest.fn(),
    // Mock the find method for fetching transactions
    find: jest.fn(),
    // Mock the findOne method for updating a transaction
    findOne: jest.fn(),
    // Mock the deleteOne method for deleting a transaction
    deleteOne: jest.fn(),
}));

// Mock the instance methods of the Transaction model
const mockTransactionInstance = {
    // Mock the save method for creating a new transaction
    save: jest.fn(),
    // Mock the find method for fetching transactions
    find: jest.fn(),
    // Mock the findOne method for updating a transaction
    findOne: jest.fn(),
    // Mock the deleteOne method for deleting a transaction
    deleteOne: jest.fn(),
};

// Set up the mock create method to return the mock instance
(jest.requireMock('../../src/entities/Transaction') as any).create.mockReturnValue(mockTransactionInstance);

describe('TransactionService', () => {
    const userId: ObjectId = new ObjectId();
    const transactionInput = {
        amount: 100,
        date: new Date(),
        category: 'Expense',
        description: 'Groceries',
        type: 'Expense',
    };
    const transactionId: ObjectId = new ObjectId();

    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();
    });

    describe('addTransaction', () => {
        it('adds a new transaction successfully', async () => {
            // Mock the save method to resolve
            (mockTransactionInstance.save as jest.Mock).mockResolvedValueOnce(undefined);

            // Call the addTransaction method
            const result = await TransactionService.addTransaction(userId, transactionInput);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Transaction added',
                payload: expect.any(Transaction),
            });

            // Ensure that the save method was called with the correct parameters
            expect(mockTransactionInstance.save).toHaveBeenCalledWith({
                amount: 100,
                date: expect.any(Date),
                category: 'Expense',
                description: 'Groceries',
                userReference: userId,
                type: 'Expense',
            });
        });

        it('handles error when adding a new transaction', async () => {
            // Mock the save method to reject
            (mockTransactionInstance.save as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

            // Call the addTransaction method
            const result = await TransactionService.addTransaction(userId, transactionInput);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server error',
                payload: {},
            });
        });
    });
    
    describe('getAllTransactions', () => {
        it('fetches all transactions successfully', async () => {
            // Mock the find method to resolve with a list of transactions
            const mockTransactions = [
                { _id: new ObjectId(), amount: 100, description: 'Transaction 1' },
                { _id: new ObjectId(), amount: 50, description: 'Transaction 2' },
                ];
            (Transaction.find as jest.Mock).mockResolvedValueOnce(mockTransactions);

            // Call the getAllTransactions method
            const result = await TransactionService.getAllTransactions(userId);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Transaction fetched',
                payload: mockTransactions,
            });

            // Ensure that the find method was called with the correct parameters
            expect(Transaction.find).toHaveBeenCalledWith({ userReference: userId });
        });

        it('handles error when fetching transactions', async () => {
            // Mock the find method to reject
            (Transaction.find as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

            // Call the getAllTransactions method
            const result = await TransactionService.getAllTransactions(userId);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server error',
                payload: [],
            });
        });
    });
    
    describe('updateTransaction', () => {
        it('updates transaction successfully', async () => {
            // Mock the findOne method to resolve with a transaction
            const mockTransaction = { _id: transactionId, amount: 100, description: 'Transaction 1', save : jest.fn() };
            (Transaction.findOne as jest.Mock).mockResolvedValueOnce(mockTransaction);

            // Call the updateTransaction method
            const updateData = { amount: 150, description: 'Updated Transaction' };
            const result = await TransactionService.updateTransaction(userId, transactionId, updateData);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Transaction updated',
                payload: mockTransaction,
            });

            // Ensure that the findOne and save methods were called with the correct parameters
            expect(Transaction.findOne).toHaveBeenCalledWith({
                _id: transactionId,
                userReference: userId,
            });
            expect(mockTransaction.save).toHaveBeenCalledWith();
        });

        it('handles error when updating transaction', async () => {
            // Mock the findOne method to reject
            (Transaction.findOne as jest.Mock).mockRejectedValueOnce(new Error('Transaction not found'));

            // Call the updateTransaction method
            const result = await TransactionService.updateTransaction(userId, transactionId, {});

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server occurred',
                payload: {},
            });
        });

        it('handles case where transaction is not found for the user', async () => {
            // Mock the findOne method to resolve with null (transaction not found)
            (Transaction.findOne as jest.Mock).mockResolvedValueOnce(null);

            // Call the updateTransaction method
            const result = await TransactionService.updateTransaction(userId, transactionId, {});

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: false,
                message: 'Transaction not found for the user',
                payload: {},
            });
        });
    });
    
    describe('deleteTransaction', () => {
        it('deletes transaction successfully', async () => {
            // Mock the deleteOne method to resolve with the result indicating one deleted document
            (Transaction.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });

            // Call the deleteTransaction method
            const result = await TransactionService.deleteTransaction(userId, transactionId);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Transaction deleted',
                payload: {},
            });

            // Ensure that the deleteOne method was called with the correct parameters
            expect(Transaction.deleteOne).toHaveBeenCalledWith({
                _id: transactionId,
                userReference: userId,
            });
        });

        it('handles error when deleting transaction', async () => {
            // Mock the deleteOne method to reject
            (Transaction.deleteOne as jest.Mock).mockRejectedValueOnce(new Error('Delete error'));

            // Call the deleteTransaction method
            const result = await TransactionService.deleteTransaction(userId, transactionId);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server occurred',
                payload: {},
            });
        });

        it('handles case where transaction is not found for the user', async () => {
            // Mock the deleteOne method to resolve with the result indicating zero deleted documents
            (Transaction.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 0 });

            // Call the deleteTransaction method
            const result = await TransactionService.deleteTransaction(userId, transactionId);

            // Expect the result to have the appropriate structure
            expect(result).toEqual({
                status: 200,
                isSuccess: false,
                message: 'Transaction not found or not deleted',
                payload: {},
            });
        });
    });

});
