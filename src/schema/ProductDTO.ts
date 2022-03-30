import { IProductDTO } from '../interfaces/IProductDTO';

export class ProductDTO implements IProductDTO{
    private _description: string;
    private _value: number;

    constructor(description: string, value: number) {
        this._description = description;
        this._value = value;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}