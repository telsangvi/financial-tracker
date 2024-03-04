import { ObjectId } from 'mongodb';
import CategoryService from '../../src/categories/services/categoryService';
import Category from '../../src/entities/Category';

// Mock the Category model
jest.mock('../../src/entities/Category', () => ({
    // Mock the create method to create a mock instance of Category
    create: jest.fn(),
}));

describe('CategoryService', () => {
    const userId: ObjectId = new ObjectId();
    const categoryName: string = 'Groceries';
    const categoryId: ObjectId = new ObjectId();

    beforeEach(() => {
        // Clear mock calls before each test
        jest.clearAllMocks();
    });

    describe('addCategory', () => {
        it('adds a new category successfully', async () => {
            // Mock the create method to create a mock instance of Category
            const mockCategoryInstance = new Category();
            (Category.create as jest.Mock).mockReturnValueOnce(mockCategoryInstance);

            // Mock the save method on the mock instance
            const saveMock = jest.fn();
            mockCategoryInstance.save = saveMock;

            // Call the addCategory method
            const result = await CategoryService.addCategory(userId, categoryName);

            // Expectations
            expect(Category.create).toHaveBeenCalled();
            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Category added',
                payload: expect.any(Category),
            });
        });

        it('handles error when adding a new category', async () => {
            // Mock the create method to create a mock instance of Category
            (Category.create as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

            // Call the addCategory method
            const result = await CategoryService.addCategory(userId, categoryName);

            // Expectations
            expect(Category.create).toHaveBeenCalled();
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server error',
                payload: {},
            });
        });
    });

    describe('getAllCategories', () => {
        it('fetches all categories successfully', async () => {
            // Mock the find method to resolve with a list of categories
            const mockCategories = [
                { _id: new ObjectId(), name: 'Category 1' },
                { _id: new ObjectId(), name: 'Category 2' },
                ];
            (Category.find as jest.Mock).mockResolvedValueOnce(mockCategories);

            // Call the getAllCategories method
            const result = await CategoryService.getAllCategories(userId);

            // Expectations
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Categories fetched',
                payload: mockCategories,
            });
            expect(Category.find).toHaveBeenCalledWith({ userReference: userId });
        });

        it('handles error when fetching categories', async () => {
            // Mock the find method to reject
            (Category.find as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

            // Call the getAllCategories method
            const result = await CategoryService.getAllCategories(userId);

            // Expectations
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server error',
                payload: [],
            });
        });
    });

    describe('updateCategory', () => {
        it('updates category successfully', async () => {
            // Mock the findOne method to resolve with a category
            const mockCategory = { _id: categoryId, name: 'Category 1' };
            (Category.findOne as jest.Mock).mockResolvedValueOnce(mockCategory);

            // Call the updateCategory method
            const updateData = { name: 'Updated Category' };
            const result = await CategoryService.updateCategory(userId, categoryId, updateData);

            // Expectations
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Category updated',
                payload: mockCategory,
            });
            expect(Category.findOne).toHaveBeenCalledWith({
                _id: categoryId,
                userReference: userId,
            });
            expect(mockCategory.save).toHaveBeenCalledWith();
        });

        it('handles error when updating category', async () => {
            // Mock the findOne method to reject
            (Category.findOne as jest.Mock).mockRejectedValueOnce(new Error('Category not found'));

            // Call the updateCategory method
            const result = await CategoryService.updateCategory(userId, categoryId, {});

            // Expectations
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server occurred',
                payload: {},
            });
        });

        it('handles case where category is not found for the user', async () => {
            // Mock the findOne method to resolve with null (category not found)
            (Category.findOne as jest.Mock).mockResolvedValueOnce(null);

            // Call the updateCategory method
            const result = await CategoryService.updateCategory(userId, categoryId, {});

            // Expectations
            expect(result).toEqual({
                status: 200,
                isSuccess: false,
                message: 'Category not found for the user',
                payload: {},
            });
        });
    });

    describe('deleteCategory', () => {
        it('deletes category successfully', async () => {
            // Mock the deleteOne method to resolve with the result indicating one deleted document
            (Category.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });

            // Call the deleteCategory method
            const result = await CategoryService.deleteCategory(userId, categoryId);

            // Expectations
            expect(result).toEqual({
                status: 200,
                isSuccess: true,
                message: 'Category deleted',
                payload: {},
            });
            expect(Category.deleteOne).toHaveBeenCalledWith({
                _id: categoryId,
                userReference: userId,
            });
        });

        it('handles error when deleting category', async () => {
            // Mock the deleteOne method to reject
            (Category.deleteOne as jest.Mock).mockRejectedValueOnce(new Error('Delete error'));

            // Call the deleteCategory method
            const result = await CategoryService.deleteCategory(userId, categoryId);

            // Expectations
            expect(result).toEqual({
                status: 500,
                isSuccess: false,
                message: 'Internal server occurred',
                payload: {},
            });
        });

        it('handles case where category is not found for the user', async () => {
            // Mock the deleteOne method to resolve with the result indicating zero deleted documents
            (Category.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 0 });

            // Call the deleteCategory method
            const result = await CategoryService.deleteCategory(userId, categoryId);

            // Expectations
            expect(result).toEqual({
                status: 200,
                isSuccess: false,
                message: 'Category not found or not deleted',
                payload: {},
            });
        });
    });
});
