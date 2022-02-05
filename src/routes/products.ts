import express from 'express';
import { productValidation } from '../middleware/validation';
import { productControllers } from '../controllers/products.controllers'

export const products = express.Router();

products.post('/', productValidation, productControllers.createProduct);
products.get('/:id', productControllers.readProduct);
products.put('/:id', productValidation, productControllers.updateProduct);
products.delete('/:id', productControllers.deleteProduct);