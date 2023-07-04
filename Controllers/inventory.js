import { ObjectId } from "bson";
import { client } from "../db.js";



export function getAllInventory(req){
    return client
    .db("guvi")
    .collection("inventory")
    .find(req.query)
    .toArray();
  }


  export function getInventoryById(id){
    return client
    .db("guvi")
    .collection("inventory")
    .findOne({_id: new ObjectId(id)});
    
  }

  export function addInventory(data){
    return client
    .db("guvi")
    .collection("inventory")
    .insertOne(data);
  }

  export function updateInventory(id,updatedData){
    return client
    .db("guvi")
    .collection("inventory")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:updatedData});
  }

  export function deleteInventory(id){
    return client
    .db("guvi")
    .collection("inventory")
    .deleteOne({_id: new ObjectId(id)});
  }