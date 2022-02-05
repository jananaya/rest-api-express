import * as mysql from 'mysql';
import { IProduct } from './domain/interfaces/IProduct';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

export class Database {
    private connection: mysql.Connection;
    private tableName: string;

    constructor() {
        this.tableName = 'Products';
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });

        this.connection.connect((err) => {
            if (err) throw err;
        });
    }

    private notExistError(id: number): Error {
        return new Error(`the product with id \"${id}\" not exist on the database!`);
    }

    addProduct(data: IProduct): Promise<string> {
        const insertQuery = `INSERT INTO ${this.tableName} (\`description\`, \`value\`)
                             VALUES (?, ?)`;
        const query = mysql.format(insertQuery, [data.description, data.value]);

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err) => {
                if (err) reject(err);
                else resolve('Product created successfully!');
            })
        });
    }

    getProduct(id: number): Promise<IProduct> {
        const query = `SELECT * FROM ${this.tableName} WHERE id=${id}`;

        return new Promise<IProduct>((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    }

    deleteProduct(id: number): Promise<string> {
        const query = `DELETE FROM ${this.tableName} WHERE id=${id}`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                const productExist = result.affectedRows != 0;

                if (err)
                    reject(err);
                else if (!productExist)
                    reject(this.notExistError(id));
                else
                    resolve('Product deleted successfully!');
            })
        });
    }

    updateProduct(id: number, data: IProduct): Promise<string> {
        const insertQuery = `UPDATE ${this.tableName} SET description=?, value=? WHERE id=${id}`;
        const query = mysql.format(insertQuery, [data.description, data.value]);

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                const productExist = result.affectedRows != 0;

                if (err)
                    reject(err);
                else if (!productExist)
                    reject(this.notExistError(id));
                else
                    resolve('Product updated successfully!');
            })
        });
    }
}