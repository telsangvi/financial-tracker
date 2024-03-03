import express, { Request, Response } from 'express';
import TransactionController from '../controllers/transactionController';

const routes = express.Router();

// Add a new income/expense record
routes.post('/', async (req: Request, res: Response) => {
  TransactionController.addTransaction(req, res);
});

// Fetch all transactions for the logged-in user
routes.get('/', async (req: Request, res: Response) => {
  TransactionController.getAllTransactions(req, res);
});

// Update a specific transaction
routes.put('/:transactionId', async (req: Request, res: Response) => {
  TransactionController.updateTransaction(req, res);
});

// Delete a specific transaction
routes.delete('/:transactionId', async (req: Request, res: Response) => {
  TransactionController.deleteTransaction(req, res);
});

export default routes;
