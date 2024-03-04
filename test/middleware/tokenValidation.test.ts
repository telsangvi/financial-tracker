import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import validateToken from '../../src/middlewares/tokenValidation';

// Mocking JWT_SECRET for testing
process.env.JWT_SECRET = 'test-secret-key';

describe('validateToken Middleware', () => {
    let reqMock: Partial<Request>;
    let resMock: Partial<Response>;
    let nextMock: NextFunction;

    beforeEach(() => {
        reqMock = { cookies: {} };
        resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        nextMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if no token provided', () => {
        validateToken(reqMock as Request, resMock as Response, nextMock);

        expect(resMock.status).toHaveBeenCalledWith(401);
        expect(resMock.json).toHaveBeenCalledWith({ message: 'Unauthorized - Token not provided' });
        expect(nextMock).not.toHaveBeenCalled();
    });

    it('should return 403 if the token is invalid', () => {
        reqMock.cookies['x-authorization'] = 'invalid-token';

        validateToken(reqMock as Request, resMock as Response, nextMock);

        expect(resMock.status).toHaveBeenCalledWith(403);
        expect(resMock.json).toHaveBeenCalledWith({ message: 'Forbidden - Invalid token' });
        expect(nextMock).not.toHaveBeenCalled();
    });

    it('should set userId in the request object if the token is valid', () => {
        const userId = 'user-id';
        const validToken = jwt.sign({ userId }, process.env.JWT_SECRET || 'test-secret-key');
        reqMock.cookies['x-authorization'] = validToken;

        validateToken(reqMock as Request, resMock as Response, nextMock);

        expect(nextMock).toHaveBeenCalled();
        expect(reqMock.user?.id).toBe(userId);
    });
});

// Resetting JWT_SECRET to its original value after testing
process.env.JWT_SECRET = undefined;
