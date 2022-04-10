import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { isProduct } from '../utils/isProduct';

export namespace productsMiddlewares {
    export const validate = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isProduct(req.body))
                throw new Error('The shipped product is not valid!');
            next();
        } catch (error) {
            next(error)
        }
    }
}