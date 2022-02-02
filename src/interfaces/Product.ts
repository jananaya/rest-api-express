export interface Product {
    description: string;
    value: number;
}

export const instanceOfProduct = (object: any): object is Product => {
    
    if ('description' in object  && 'value' in object)
        return typeof object.description === 'string' && typeof object.value === 'number';
   
    return false;
}