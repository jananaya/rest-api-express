import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { instanceOfProduct } from '../interfaces/Product';

export const productValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!instanceOfProduct(req.body))
            throw new Error('The shipped product is not valid!');
    } catch (error) {
        next(error)
    }
}