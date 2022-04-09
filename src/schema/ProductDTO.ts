import { IProductDTO } from '../interfaces/IProductDTO';

export class ProductDTO implements IProductDTO {
    private id: number;
    private description: string;
    private value: number;

    constructor(id: number, description: string, value: number) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
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