import {MongoClient} from 'mongodb'
import Obj from 'mongodb'

const MongoUrl ="mongodb+srv://karthi:karthi25@cluster0.thtkzhz.mongodb.net/?retryWrites=true&w=majority"
async function createConnection(){
   const client = new MongoClient(MongoUrl);
   await client.connect()
   console.log("MongoDB connected successflly");
   return client
}
 
export var ObjectId = Obj.ObjectId;

export const client = await createConnection();