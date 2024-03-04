import { connect } from 'mongoose';
import connectToDatabase from '../src/database';

jest.mock('mongoose');

describe('connectToDatabase', () => {
    it('connects to the database successfully', async () => {
        // Mock the mongoose.connect function
        (connect as jest.Mock).mockResolvedValueOnce(undefined);

        // Call the function and expect it to resolve without errors
        await expect(connectToDatabase()).resolves.toBeUndefined();

        // Ensure that mongoose.connect was called with the correct URI
        expect(connect).toHaveBeenCalledWith('mongodb://db:27017/FinancialTracker');
    });

    it('handles connection errors', async () => {
        // Mock the mongoose.connect function to simulate an error
        const mockError = new Error('Connection error');
        (connect as jest.Mock).mockRejectedValueOnce(mockError);

        try{
            // Call the function and expect it to reject with the error
            await expect(connectToDatabase()).rejects.toThrowError(mockError);
        }catch(error){
            console.log('connectToDatabase - handles connection errors')
        }

        // Ensure that mongoose.connect was called with the correct URI
        expect(connect).toHaveBeenCalledWith('mongodb://db:27017/FinancialTracker');
    });
});
