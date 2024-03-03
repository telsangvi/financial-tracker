import express, { Request, Response } from 'express';
import CategoryController from '../controllers/categoryController';

const routes = express.Router();

routes.post('/', async (req: Request, res: Response) => {
  CategoryController.addCategory(req, res);
});

routes.get('/', async (req: Request, res: Response) => {
  CategoryController.getAllCategories(req, res);
});

routes.put('/:categoryId', async (req: Request, res: Response) => {
  CategoryController.updateCategory(req, res);
});

routes.delete('/:categoryId', async (req: Request, res: Response) => {
  CategoryController.deleteCategory(req, res);
});

export default routes;
