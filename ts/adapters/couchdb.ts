import { IConfig, IDatabaseTable, IDatabase } from "./adapterInterfaces";

class Table {

    constructor(private conn: any, private tableName: string) {
    }

    insert(data: Object): Promise<string> {
        let p = new Promise<string>(function(resolve, reject) {
            resolve(`insert {data}`);
        });
        return p;
    }

    get(id: number): Promise<string> {
        let p = new Promise<string>(function(resolve, reject) {
            resolve(`get ${id}`);
        });
        return p;
    }

    getAllRows(limit: number, offset: number): Promise<string> {
        let p = new Promise<string>(function(resolve, reject) {
            resolve(`getAllRows ${limit} ${offset}`);
        });
        return p;
    }

    delete(id: number): Promise<string> {
        let p = new Promise<string>(function(resolve, reject) {
            resolve(`delete ${id}`);
        });
        return p;
    }
}

export default class Database implements IDatabase {
    private conn: any;

    constructor(config: IConfig) {
        this.conn = `foo`
    }

    createTable(name: string, columns: {}): Promise<string> {
        if (name === "name") {
            return Promise.resolve(`create ${name} ${columns}`)
        } else {
            return Promise.reject(`create ${name} ${columns}`)
        }

    }

    deleteTable(name: string): Promise<string> {
        let p = new Promise<string>(function(resolve, reject) {
            resolve(`deleted ${name}`);
        });
        return p;
    }

    table(tableName: string): IDatabaseTable {
        return new Table(this.conn, tableName)
    }
}
