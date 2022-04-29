import { IProductDTO } from '../interfaces/IProductDTO';
import { ProductDTO } from './ProductDTO';

export class ProductMapper {
    static toDTO(product: any): IProductDTO | null {
        try {
            return new ProductDTO(product.description, product.value, product.imagePath);
        } catch {
            return null;
        }
    }
}
