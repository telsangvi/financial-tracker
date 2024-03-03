import { Request, Response } from 'express';
import formatResponse from '../../utils';
import CategoryService from '../services/categoryService';

export default class CategoryController {
  static async addCategory(req: Request, res: Response) {
    const userId = req.user.id; // Assuming you have user information in req.user
    const { categoryName } = req.body;

    const result = await CategoryService.addCategory(userId, categoryName);

    return formatResponse(result, res);
  }

  static async getAllCategories(req: Request, res: Response) {
    const userId = req.user.id; // Assuming you have user information in req.user

    const result = await CategoryService.getAllCategories(userId);

    return formatResponse(result, res);
  }

  static async updateCategory(req: Request, res: Response) {
    const userId = req.user.id; // Assuming you have user information in req.user
    const { categoryId } = req.params;
    const updateData = req.body;

    const result = await CategoryService.updateCategory(
      userId,
      categoryId,
      updateData,
    );

    return formatResponse(result, res);
  }

  static async deleteCategory(req: Request, res: Response) {
    const userId = req.user.id; // Assuming you have user information in req.user
    const { categoryId } = req.params;

    const result = await CategoryService.deleteCategory(userId, categoryId);

    return formatResponse(result, res);
  }
}
