import {MongoClient} from 'mongodb'
import Obj from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MongoUrl = process.env.MONGO_URL
async function createConnection(){
   const client = new MongoClient(MongoUrl);
   await client.connect()
   console.log("MongoDB connected successflly");
   return client
}
 
export var ObjectId = Obj.ObjectId;

export const client = await createConnection();