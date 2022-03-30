import { IProductDTO } from '../interfaces/IProductDTO';

export const meetsIProduct = (object: any): object is IProductDTO => {
    if ('description' in object  && 'value' in object)
        return typeof object.description === 'string' && typeof object.value === 'number';
        
    return false;
}