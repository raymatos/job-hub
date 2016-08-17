import { IDbConfig, IDatabaseTable, IDatabase } from "./adapterInterfaces";
import * as PouchDB from "pouchdb"


class Table {

    constructor(private conn: any) {
    }

    insert(data: Object): Promise<string> {
      return this.conn.put(data)
    }

    get(id: number): Promise<string> {
        return this.conn.get(id)
    }

    getAllRows(limit: number, offset: number): Promise<string> {
        return this.conn.allDocs({
            include_docs:true,
            limit: limit,
            skip: offset
        })
    }

    delete(id: number): Promise<string> {
        return this.conn.remove(id)
    }
}

export default class Database implements IDatabase {
    private conn: any;
    private tables: Array<string>;

    constructor(config: IDbConfig) {
        this.conn = `http://${config.username}:${config.password}@${config.host}:${config.port}`
    }

    createTable(name: string, columns: {}): Promise<string> {
        if (name === "name") {
            this.tables[name] = new PouchDB(`${this.conn}/${name}`)
            return this.tables[name];
        } else {
            return Promise.reject(`A name must be provided`)
        }

    }

    deleteTable(name: string): Promise<string> {
      return this.tables[name].destory();
    }

    table(name: string): IDatabaseTable {
        return new Table(this.tables[name])
    }
}
