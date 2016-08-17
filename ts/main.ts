// Sample exports from other modules
// import db from "./adapters/couchdb";
//
// let database = new db({
//   host: "String",
//   port: 123,
//   username: "String",
//   password: "String"
// })
//
// // Sample export of our own
// export var bas = "123";
import {IDbConfig} from "./adapters/adapterInterfaces";

export interface IDbAdapter {
  name: string;
  config: IDbConfig;
}

export interface ISettings {
  someSetting?: string
}

export interface ITrigger {
  cron?: string;
  timezone?: string;
  event?: string;
  startTime?: string;
  endTime?: string;
}

export interface IJob {
  name: string;
  description?: string;
  trigger: ITrigger;
  stateful: boolean
  excute(data: any, callback: Function): Promise<any>
}

interface ITransitHub {
  init(jobs: Array<IJob>): Promise<any>
}

export default class transithub {
  constructor(private dbAdapter: IDbAdapter, private settings: ISettings){

  }

  init(jobs: Array<IJob>){
    return Promise.resolve(`All good`)
  }

}
