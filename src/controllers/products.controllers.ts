import { Database } from '../schema/Database';
import { NextFunction, Request, Response } from 'express';
import { responseSuccessBody } from '../utils/responseSuccessBody';
import { ProductMapper } from '../schema/ProductMapper';
import { ProductRepo } from '../schema/ProductRepo';
import { IProductDTO } from '../interfaces/IProductDTO';

const database = Database.getInstance();
const productRepo = new ProductRepo(database);

export namespace productsControllers {
    export const createProduct = (req: Request, res: Response, next: NextFunction) => {
        productRepo.create(req.body)
            .then(message => res.json(responseSuccessBody(message)))
            .catch(error => next(error))
    }

    export const readProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);
        const productPromise = productRepo.readByID(id);

        productPromise
            .then(product => res.json(ProductMapper.toDTO(product)))
            .catch(error => next(error))
    }

    export const readAllProducts = (req: Request, res: Response, next: NextFunction) => {
        const itemsPromise = productRepo.read();

        itemsPromise
            .then(products => {
                let arrDTOs: IProductDTO[] = [];

                for (let product of products) {
                    let productDTO = ProductMapper.toDTO(product);
                    if (productDTO)
                        arrDTOs.push(productDTO);
                }

                res.json(arrDTOs);
            })
            .catch(error => next(error))
    }

    export const updateProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);

        productRepo.update(id, req.body)
            .then((message) => res.json(responseSuccessBody(message)))
            .catch(error => next(error))
    }

    export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id);

        productRepo.delete(id)
            .then((message) => res.json(responseSuccessBody(message)))
            .catch(error => next(error));
    }
}
