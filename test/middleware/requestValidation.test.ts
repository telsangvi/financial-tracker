import { Request, Response, NextFunction } from 'express';
import { Type } from 'typebox';
import validateRequest from '../../src/middlewares/requestValidation';

// Mock Typebox schema for testing
const mockBodySchema = Type.Object({ key: Type.String() });
const mockParamsSchema = Type.Object({ id: Type.String() });

describe('validateRequest Middleware', () => {
    let reqMock: Partial<Request>;
    let resMock: Partial<Response>;
    let nextMock: NextFunction;

    beforeEach(() => {
        reqMock = { body: {}, params: {} };
        resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        nextMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should validate and parse request body if bodySchema is provided', () => {
        reqMock.body = { key: 'value' };

        validateRequest(mockBodySchema)(reqMock as Request, resMock as Response, nextMock);

        expect(reqMock.body).toEqual({ key: 'value' }); // Expect body to remain unchanged
        expect(nextMock).toHaveBeenCalled();
    });

    it('should validate and parse request params if paramsSchema is provided', () => {
        reqMock.params = { id: '123' };

        validateRequest(undefined, mockParamsSchema)(reqMock as Request, resMock as Response, nextMock);

        expect(reqMock.params).toEqual({ id: '123' }); // Expect params to remain unchanged
        expect(nextMock).toHaveBeenCalled();
    });

    it('should handle Type.Error and respond with 400 if validation fails', () => {
        reqMock.body = { key: 123 }; // Invalid type for 'key'

        validateRequest(mockBodySchema)(reqMock as Request, resMock as Response, nextMock);

        expect(resMock.status).toHaveBeenCalledWith(400);
        expect(resMock.json).toHaveBeenCalledWith({ error: 'bad request' });
        expect(nextMock).not.toHaveBeenCalled();
    });

    it('should handle other errors and respond with 500 if an error occurs during validation', () => {
        reqMock.body = { key: 'value' };
        jest.spyOn(Type, 'parse').mockImplementationOnce(() => {
            throw new Error('Test error');
        });

        validateRequest(mockBodySchema)(reqMock as Request, resMock as Response, nextMock);

        expect(resMock.status).toHaveBeenCalledWith(500);
        expect(resMock.json).toHaveBeenCalledWith({ error: 'Internal server error occurred' });
        expect(nextMock).not.toHaveBeenCalled();

        jest.restoreAllMocks();
    });
});
