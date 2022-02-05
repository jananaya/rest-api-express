import {Database} from '../database';
import {NextFunction, Request, Response} from 'express';
import {responseSuccessBody} from '../utils/responseSuccessBody';

const database = new Database();

export namespace productControllers {
    export const createProduct = (req: Request, res: Response, next: NextFunction) => {
        database.addProduct(req.body)
            .then(message => res.json(responseSuccessBody(message)))
            .catch(error => next(error))
    }

    export const readProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);

        database.getProduct(id)
            .then(product => res.json(product))
            .catch(error => next(error))
    }

    export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);

        database.updateProduct(id, req.body)
            .then((message) => res.json(responseSuccessBody(message)))
            .catch(error => next(error))
    }

    export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);

        database.deleteProduct(id)
            .then((message) => res.json(responseSuccessBody(message)))
            .catch(error => next(error));
    }
}
