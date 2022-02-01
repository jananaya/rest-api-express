import * as mysql from 'mysql';
import { Connection } from 'mysql';
import { Product } from './interfaces/Product';
import 'dotenv/config';

export class Database {
    private connection: Connection;
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

    addProduct(data: Product) {
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

    getProduct(id: number): Promise<Product> {
        const query = `SELECT * FROM ${this.tableName} WHERE id=${id}`;

        return new Promise<Product>((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        });
    }

    deleteProduct(id: number) {
        const query = `DELETE FROM ${this.tableName} WHERE id=${id}`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err) => {
                if (err) reject(err);
                else resolve('Product deleted successfully!');
            })
        });
    }

    updateProduct(id: number, data: Product) {
        const insertQuery = `UPDATE ${this.tableName} SET description=?, value=? WHERE id=${id}`;
        const query = mysql.format(insertQuery, [data.description, data.value]);

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err) => {
                if (err) reject(err);
                else resolve('Product created successfully!');
            })
        })
    }
}