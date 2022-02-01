import express from 'express';
// @ts-ignore
import morgan from 'morgan';
import { products } from './routes/products';
import { errors } from './middleware/errors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/products', products);
// @ts-ignore
app.use(errors);

app.listen(port, () => {
    console.log(`server init in port ${port}`)
})