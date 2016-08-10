



export interface IConfig {
  host: String;
  port: Number;
  database?: String;
  schema?: String;
  username: String;
  password: String;
}

export interface IDatabaseObject {
  createTable(name:String, columns:Object): Promise<String>;
  deleteTable(name: string): Promise<String>;
  table(name: string): IDatabaseTableObject;
}

export interface IDatabaseTableObject {
  insert(data: Object): Promise<String>;
  get(id: Number): Promise<String>;
  getAllRows(limit: Number, offset: Number): Promise<String>;
  delete(id: Number): Promise<String>;
}

export class Database implements IDatabaseObject {
  conn: any;

  constructor(config: IConfig){
    this.conn = `foo`
  }

  createTable(name, columns){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`create ${name} ${columns}`);
    });
    return p;
  }

  deleteTable(name){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`deleted ${name}`);
    });
    return p;
  }

  table(tableName) {
    return new Table(this.conn, tableName)
  }
}

export class Table implements IDatabaseTableObject {
  conn: any;
  tableName: String;

  constructor(conn:any, tableName: String){
    this.conn = conn;
    this.tableName = tableName;
  }

  insert(data){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`insert {data}`);
    });
    return p;
  }

  get(id){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`get ${id}`);
    });
    return p;
  }

  getAllRows(limit, offset){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`getAllRows ${limit} ${offset}`);
    });
    return p;
  }

  delete(id){
    let p = new Promise<string>(function (resolve, reject) {
        resolve(`delete ${id}`);
    });
    return p;
  }
}


export default {Database};
