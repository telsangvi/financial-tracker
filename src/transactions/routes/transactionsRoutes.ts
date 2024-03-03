import express, { Request, Response } from 'express';
import TransactionController from '../controllers/transactionController';
import validateRequest from '../../middlewares/requestValidation';
import {
  AddTransactionRequest,
  UpdateTransactionRequest,
  ObjectIdParam
} from '../schema/transactionSchema';
const routes = express.Router();

// Add a new income/expense record
routes.post('/', async (req: Request, res: Response) => {
  validateRequest(AddTransactionRequest),
  TransactionController.addTransaction(req, res);
});

// Fetch all transactions for the logged-in user
routes.get('/', async (req: Request, res: Response) => {
  TransactionController.getAllTransactions(req, res);
});

// Update a specific transaction
routes.put('/:transactionId', async (req: Request, res: Response) => {
  validateRequest(UpdateTransactionRequest,ObjectIdParam),
  TransactionController.updateTransaction(req, res);
});

// Delete a specific transaction
routes.delete('/:transactionId', async (req: Request, res: Response) => {
  validateRequest(undefined,ObjectIdParam),
  TransactionController.deleteTransaction(req, res);
});

export default routes;
