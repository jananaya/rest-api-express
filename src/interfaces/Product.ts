export interface Product {
    description: string;
    value: number;
}

export const instanceOfProduct = (object: any): object is Product => {
    return 'description' in object && 'value' in object;
}