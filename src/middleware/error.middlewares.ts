import { NextFunction } from 'express';
import { Response } from 'express';

export const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        status: 'ERROR',
        message: err.message
    });
}