import { ObjectId } from 'mongodb';
import Category from '../../entities/Category';

export default class CategoryService {
  public static async addCategory(
    userId: ObjectId,
    categoryName: string,
  ): Promise<any> {
    try {
      // Create a new category instance
      const newCategory = new Category({
        name: categoryName,
        userReference: userId,
      });

      // Save the category to the database
      await newCategory.save();

      // Return the newly created category details
      return {
        status: 200,
        isSuccess: true,
        message: 'Category added',
        payload: newCategory,
      };
    } catch (error) {
      console.error('Error adding category:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server error',
        payload: {},
      };
    }
  }

  public static async getAllCategories(userId: ObjectId): Promise<any> {
    try {
      // Fetch all categories for the given user
      const categories = await Category.find({ userReference: userId });

      // Respond with the list of categories
      return {
        status: 200,
        isSuccess: true,
        message: 'Categories fetched',
        payload: categories,
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: [],
      };
    }
  }

  public static async updateCategory(
    userId: ObjectId,
    categoryId: ObjectId,
    updateData: Partial<Category>,
  ): Promise<any> {
    try {
      // Find the category by ID and user reference
      const category = await Category.findOne({
        _id: categoryId,
        userReference: userId,
      });

      if (!category) {
        // Category not found for the user
        return null;
      }

      // Update the category with the provided data
      Object.assign(category, updateData);
      await category.save();

      // Respond with the updated category details
      return {
        status: 200,
        isSuccess: true,
        message: 'Category updated',
        payload: category,
      };
    } catch (error) {
      console.error('Error updating category:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: {},
      };
    }
  }

  public static async deleteCategory(
    userId: ObjectId,
    categoryId: ObjectId,
  ): Promise<any> {
    try {
      // Delete the category by ID and user reference
      const result = await Category.deleteOne({
        _id: categoryId,
        userReference: userId,
      });

      // Check if the category was found and deleted
      if (result.deletedCount === 1) {
        // Success
        return {
          status: 200,
          isSuccess: true,
          message: 'Category deleted',
          payload: {},
        };
      }
      // Category not found or not deleted
      return {
        status: 200,
        isSuccess: false,
        message: 'Category delete failed',
        payload: {},
      };
    } catch (error) {
      console.error('Error deleting category:', error);
      return {
        status: 500,
        isSuccess: false,
        message: 'Internal server occurred',
        payload: {},
      };
    }
  }
}
