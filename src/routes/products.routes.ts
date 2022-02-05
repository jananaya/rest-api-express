import express from 'express';
import { productsMiddlewares } from '../middleware/products.middlewares';
import { productsControllers } from '../controllers/products.controllers'

export const products = express.Router();

products.post('/', productsMiddlewares.validate, productsControllers.createProduct);
products.get('/:id', productsControllers.readProduct);
products.put('/:id', productsMiddlewares.validate, productsControllers.updateProduct);
products.delete('/:id', productsControllers.deleteProduct);