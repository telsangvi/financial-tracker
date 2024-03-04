import { Response } from 'express';
import formatResponse from '../../src/utils';

describe('formatResponse', () => {
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        // Mock the express response object
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should format response with payload', () => {
        const result = {
            status: 200,
            isSuccess: true,
            message: 'Success',
            payload: { data: 'example' },
        };

        formatResponse(result as any, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({
            status: 200,
            data: {
                isSuccess: true,
                message: 'Success',
                payload: { data: 'example' },
                count: undefined,
            },
        });
    });

    it('should format response without payload', () => {
        const result = {
            status: 404,
            isSuccess: false,
            message: 'Not Found',
        };

        formatResponse(result as any, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({
            status: 404,
            data: {
                isSuccess: false,
                message: 'Not Found',
                payload: undefined,
                count: undefined,
            },
        });
    });
});
