export const isProduct = (object: any): boolean => {
    if ('description' in object  && 'value' in object)
        return typeof object.description === 'string' && typeof object.value === 'number';
        
    return false;
}