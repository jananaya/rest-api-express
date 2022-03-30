import { IProductDTO } from '../interfaces/IProductDTO';

export class ProductMapper {
    static toDTO(product: any): IProductDTO {
        return {
            description: product.description,
            value: product.value
        }
    }
}
