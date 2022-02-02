import express from 'express';
import { productValidation } from '../middleware/validation';
import { Database } from '../database';

export const products = express.Router();
const database = new Database();

products.post('/', productValidation, (req, res, next) => {
    database.addProduct(req.body)
        .then(message => res.json({
            status: 'SUCCESS',
            message: message
        }))
        .catch(error => next(error))
})

products.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    database.getProduct(id)
        .then(product => res.json(product))
        .catch(error => next(error))
})

products.put('/:id', productValidation, (req, res, next) => {
    const id = parseInt(req.params.id);

    database.updateProduct(id, req.body)
        .then((message) => res.json({
            status: 'SUCCESS',
            message: message
        }))
        .catch(error => next(error))
})

products.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    database.deleteProduct(id)
        .then((message) => res.json({
            status: 'SUCCESS',
            message: message
        }))
        .catch(error => next(error));
})