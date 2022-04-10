import { IProductRepo } from '../interfaces/IProductRepo';
import { ProductDTO } from './ProductDTO';
import { Database } from './Database';

export class ProductRepo implements IProductRepo {
    private readonly TABLE_NAME = 'products';

    constructor(private database: Database) { }

    create(product: ProductDTO): Promise<string> {
        return this.database.createRegister(this.TABLE_NAME, product);
    }

    read(): Promise<any> {
        return this.database.getAllRegisters(this.TABLE_NAME);
    }

    readByID(id: number): Promise<any> {
        return this.database.findRegisterById(this.TABLE_NAME, id);
    }

    update(id: number, product: ProductDTO): Promise<string> {
        return this.database.updateRegister(this.TABLE_NAME, id, product);
    }

    delete(id: number): Promise<string> {
        return this.database.deleteRegister(this.TABLE_NAME, id);
    }
}