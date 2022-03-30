import express from 'express';
import morgan from 'morgan';
import { products } from './routes/products.routes';
import { error } from './middleware/error.middlewares';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/products', products);

// @ts-ignore
app.use(error);

app.listen(port, () => {
    console.log(`server init in port ${port}`)
})