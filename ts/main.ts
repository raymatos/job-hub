// Sample exports from other modules
import db from "./adapters/couchdb";

let database = new db({
  host: "String",
  port: 123,
  username: "String",
  password: "String"
})

// Sample export of our own
export var bas = "123";
