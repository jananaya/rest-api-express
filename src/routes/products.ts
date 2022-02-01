import express from 'express';
import { productValidation } from '../middleware/validation';
import { Database } from '../database';

export const products = express.Router();
const database = new Database();

products.post('/', productValidation, (req, res) => {
    database.addRegister(req.body);
    res.end();
})

products.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    database.getRegister(id)
        .then(product => res.json(product))
        .catch(error => next(error))
})

products.put('/:id', productValidation, (req, res, next) => {
    const id = parseInt(req.params.id);

    database.updateRegister(id, req.body)
        .then(() => res.end())
        .catch(error => next(error))
})

products.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    database.deleteRegister(id)
        .then(() => res.end())
        .catch(error => next(error));
})