import express, { Request, Response } from 'express';
import CategoryController from '../controllers/categoryController';
import validateRequest from '../../middlewares/requestValidation';
import {
  AddCategoryRequest,
  UpdateCategoryRequest,
  ObjectIdParam,
} from '../schema/categorySchema';

const routes = express.Router();

/**
 * @route POST /api/categories
 * @group Category - Operations related to categories
 * @param {AddCategoryRequest.model} request.body.required - Category information for addition
 * @returns {object} 200 - Category added successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.post('/', validateRequest(AddCategoryRequest),async (req: Request, res: Response) => {
   CategoryController.addCategory(req, res);
});

/**
 * @route GET /api/categories
 * @group Category - Operations related to categories
 * @returns {object} 200 - List of categories fetched successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.get('/', async (req: Request, res: Response) => {
  CategoryController.getAllCategories(req, res);
});

/**
 * @route PUT /api/categories/{categoryId}
 * @group Category - Operations related to categories
 * @param {UpdateCategoryRequest.model} request.body.required - Updated category information
 * @param {ObjectIdParam.param} request.params.categoryId.required - Category ID to update
 * @returns {object} 200 - Category updated successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.put('/:categoryId', validateRequest(UpdateCategoryRequest, ObjectIdParam),async (req: Request, res: Response) => {
  CategoryController.updateCategory(req, res);
});

/**
 * @route DELETE /api/categories/{categoryId}
 * @group Category - Operations related to categories
 * @param {ObjectIdParam.param} request.params.categoryId.required - Category ID to delete
 * @returns {object} 200 - Category deleted successfully
 * @returns {Error} 500 - Internal Server Error
 */
routes.delete('/:categoryId', validateRequest(undefined, ObjectIdParam),async (req: Request, res: Response) => {
  CategoryController.deleteCategory(req, res);
});

export default routes;
