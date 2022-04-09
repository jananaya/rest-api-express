import { ProductDTO } from '../schema/ProductDTO';

export interface IProductRepo {
    create(product: ProductDTO): Promise<string>;
    readByID(id: number): Promise<any>;
    delete(id: number): Promise<string>;
    update(id: number, product: ProductDTO): Promise<string>;
}