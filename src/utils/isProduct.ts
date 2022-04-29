export const isProduct = (object: any): boolean => {
    if ('description' in object  && 'value' in object && 'imagePath' in object)
        return typeof object.description === 'string' && typeof object.value === 'number' &&
            typeof object.imagePath === 'string';
        
    return false;
}