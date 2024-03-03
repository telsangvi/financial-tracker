import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Transaction from '../../entities/Transaction';

export default class TransactionService {
  public static async addTransaction(
    userId: ObjectId,
    transactionInput: TransactionInput,
  ): Promise<Transaction | null> {
    try {
      // Create a new transaction instance
      const newTransaction = new Transaction({
        amount: transactionInput.amount,
        date: transactionInput.date,
        category: transactionInput.category,
        description: transactionInput.description,
        userReference: userId,
        type: transactionInput.type,
      });

      // Save the transaction to the database
      await newTransaction.save();

      // Return the newly created transaction details
      return {
        status: 200,
        isSuccess: true,
        message: 'Transaction added',
        payload: newTransaction,
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server error',
        payload: {},
      };
    }
  }

  public static async getAllTransactions(
    userId: ObjectId,
  ): Promise<ITransaction[]> {
    try {
      // Fetch all transactions for the given user
      const transactions = await Transaction.find({ userReference: userId });

      // You can perform additional logic here if needed

      // Respond with the list of transactions
      return {
        status: 200,
        isSuccess: true,
        message: 'Transaction fetched',
        payload: transactions,
      };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: [],
      };
    }
  }

  public static async updateTransaction(
    userId: ObjectId,
    transactionId: ObjectId,
    updateData: Partial<ITransaction>,
  ): Promise<ITransaction | null> {
    try {
      // Find the transaction by ID and user reference
      const transaction = await Transaction.findOne({
        _id: transactionId,
        userReference: userId,
      });

      if (!transaction) {
        // Transaction not found for the user
        return null;
      }

      // Update the transaction with the provided data
      Object.assign(transaction, updateData);
      await transaction.save();

      // Respond with the updated transaction details
      return {
        status: 200,
        isSuccess: true,
        message: 'Transaction updated',
        payload: transaction,
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: {},
      };
    }
  }

  public static async deleteTransaction(
    userId: ObjectId,
    transactionId: ObjectId,
  ): Promise<boolean> {
    try {
      // Delete the transaction by ID and user reference
      const result = await Transaction.deleteOne({
        _id: transactionId,
        userReference: userId,
      });

      // Check if the transaction was found and deleted
      if (result.deletedCount === 1) {
        // Success
        return {
          status: 200,
          isSuccess: true,
          message: 'Transaction deleted',
          payload: {},
        };
      }
      // Transaction not found or not deleted
      return {
        status: 200,
        isSuccess: false,
        message: 'Transaction delete failed',
        payload: {},
      };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: {},
      };
    }
  }
}
