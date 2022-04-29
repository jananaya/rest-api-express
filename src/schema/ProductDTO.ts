import { IProductDTO } from '../interfaces/IProductDTO';

export class ProductDTO implements IProductDTO {
    private description: string;
    private value: number;
    private imagePath: string;

    constructor(description: string, value: number, imagePath: string) {
        this.description = description;
        this.value = value;
        this.imagePath = imagePath;
    }

    getImagePath(): string {
        return this.imagePath;   
    }

    setImagePath(path: string) {
        this.imagePath = path;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getValue(): number {
        return this.value;
    }

    setValue(value: number) {
        this.value = value;
    }
}