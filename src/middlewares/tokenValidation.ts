import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const token = req.cookies['x-authorization']

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, payload: JwtPayload | null) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        // If the token is valid, set the userId in the request object
        req['user'] = {
            id: payload?.userId,
        };

        next();
    });
};

export default authenticateToken