import express, { Request, Response } from 'express';
import TransactionController from '../controllers/transactionController';
import validateRequest from '../../middlewares/requestValidation';
import {
  AddTransactionRequest,
  UpdateTransactionRequest,
  ObjectIdParam,
} from '../schema/transactionSchema';

const routes = express.Router();

/**
 * @route POST /api/transactions
 * @group Transaction - Operations related to transactions
 * @param {AddTransactionRequest.model} request.body.required - Transaction information for addition
 * @returns {object} 200 - Transaction added successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.post('/',validateRequest(AddTransactionRequest), async (req: Request, res: Response) => {
  TransactionController.addTransaction(req, res);
});

/**
 * @route GET /api/transactions
 * @group Transaction - Operations related to transactions
 * @returns {object} 200 - List of transactions fetched successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.get('/', async (req: Request, res: Response) => {
  TransactionController.getAllTransactions(req, res);
});

/**
 * @route PUT /api/transactions/{transactionId}
 * @group Transaction - Operations related to transactions
 * @param {UpdateTransactionRequest.model} request.body.required - Updated transaction information
 * @param {ObjectIdParam.param} request.params.transactionId.required - Transaction ID to update
 * @returns {object} 200 - Transaction updated successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.put('/:transactionId',  validateRequest(UpdateTransactionRequest, ObjectIdParam), async (req: Request, res: Response) => {
  TransactionController.updateTransaction(req, res);
});

/**
 * @route DELETE /api/transactions/{transactionId}
 * @group Transaction - Operations related to transactions
 * @param {ObjectIdParam.param} request.params.transactionId.required - Transaction ID to delete
 * @returns {object} 200 - Transaction deleted successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.delete('/:transactionId',validateRequest(undefined, ObjectIdParam), async (req: Request, res: Response) => {
  TransactionController.deleteTransaction(req, res);
});

export default routes;
