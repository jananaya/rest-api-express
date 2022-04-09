import { IProductDTO } from '../interfaces/IProductDTO';
import { ProductDTO } from './ProductDTO';

export class ProductMapper {
    static toDTO(product: any): IProductDTO | null {
        try {
            return new ProductDTO(product.id, product.description, product.value);
        } catch {
            return null;
        }
    }
}
