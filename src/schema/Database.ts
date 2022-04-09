import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });

export class Database {
    private connection: mysql.Connection;
    private static instance: Database;

    private constructor() {
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

    static getInstance(): Database {
        if (!this.instance)
            this.instance = new Database();

        return this.instance;
    }

    private getMessagePromise(query: string, successMessage: string): Promise<string> {
        return new Promise((response, reject) => {
            this.connection.query(query, (error) => {
                if (error)
                    reject(error);
                else
                    response(successMessage);
            })
        })
    }

    private getResultPromise(query: string, formatResult?: Function): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, result) => {
                if (error)
                    reject(error);
                else {
                    if (formatResult)
                        resolve(formatResult(result));
                    else
                        resolve(result);
                }
            })
        })
    }

    private getColumnsNameArray(tableName: string): Promise<string[]> {
        const query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                        WHERE TABLE_NAME = N'${tableName}'`;

        return new Promise<string[]>((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err)
                    reject(err)
                else {
                    let columnsName: string[] = [];
                    for (let name of result) {
                        if (name.COLUMN_NAME !== 'id')
                            columnsName.push(name.COLUMN_NAME);
                    }
                    resolve(columnsName);
                }
            })
        })
    }

    private async getUpdateQuery(tableName: string, id: number, obj: any): Promise<string> {
        let query = `UPDATE ${tableName} SET `;
        let columnsName: string[] = [];

        await this.getColumnsNameArray(tableName).then(names => columnsName = names);

        for (let colName of columnsName) {
            if (colName in obj) {
                switch (typeof obj[colName]) {
                    case 'string':
                        query += `${colName}='${obj[colName]}', `;
                        break;
                    default:
                        query += `${colName}=${obj[colName]}, `;
                        break;
                }
            }
        }

        query = query.slice(0, query.length - 2);
        query += ` WHERE id=${id};`;

        return new Promise((resolve) => resolve(query));
    }

    createRegister(tableName: string, obj: object): Promise<string> {
        const insertQuery = `INSERT INTO ${tableName} VALUES (NULL, ?, ?)`;
        const query = mysql.format(insertQuery, Object.values(obj));

        return this.getMessagePromise(query, `Item created successfully at ${tableName}!`);
    }

    findRegisterById(tableName: string, id: number): Promise<any> {
        const query = `SELECT * FROM ${tableName} WHERE id=${id}`;
        return this.getResultPromise(query, (e: any) => {
            return e[0];
        });
    }

    async updateRegister(tableName: string, id: number, obj: object) {
        let query = '';

        await this.getUpdateQuery(tableName, id, obj)
            .then(updateQuery => query = updateQuery)

        return this.getMessagePromise(query, '');
    }

    deleteRegister(tableName: string, id: number) {
        const query = `DELETE FROM ${tableName} WHERE id=${id}`;
        return this.getMessagePromise(query, '');
    }

    getAllRegisters(table: string) {
        const query = `SELECT * FROM ${ table }`;
        return this.getResultPromise(query);
    }
}