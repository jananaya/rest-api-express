import { IProduct } from './interfaces/IProduct';

export const meetsIProduct = (object: any): object is IProduct => {
    if ('description' in object  && 'value' in object)
        return typeof object.description === 'string' && typeof object.value === 'number';
   
    return false;
}