import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { meetsIProduct } from '../utils/meetsIProduct';

export namespace productsMiddlewares {
    export const validate = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!meetsIProduct(req.body))
                throw new Error('The shipped product is not valid!');
            next();
        } catch (error) {
            next(error)
        }
    }
}