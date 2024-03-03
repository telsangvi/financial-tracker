import express, { Request, Response } from 'express';
import CategoryController from '../controllers/categoryController';
import validateRequest from '../../middlewares/requestValidation';
import { AddCategoryRequest, UpdateCategoryRequest, ObjectIdParam } from '../schema/categorySchema';

const routes = express.Router();

routes.post('/', async (req: Request, res: Response) => {
  validateRequest(AddCategoryRequest),
  CategoryController.addCategory(req, res);
});

routes.get('/', async (req: Request, res: Response) => {
  CategoryController.getAllCategories(req, res);
});

routes.put('/:categoryId', async (req: Request, res: Response) => {
  validateRequest(UpdateCategoryRequest,ObjectIdParam),
  CategoryController.updateCategory(req, res);
});

routes.delete('/:categoryId', async (req: Request, res: Response) => {
  validateRequest(undefined,ObjectIdParam),
  CategoryController.deleteCategory(req, res);
});

export default routes;
