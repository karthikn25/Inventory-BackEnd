import { ObjectId } from "bson";
import { client } from "../db.js";



export function getAllStudents(req){
    return client
    .db("guvi")
    .collection("students")
    .find(req.query)
    .toArray();
  }


  export function getStudentsById(id){
    return client
    .db("guvi")
    .collection("students")
    .findOne({_id: new ObjectId(id)});
    
  }

  export function addStudents(data){
    return client
    .db("guvi")
    .collection("students")
    .insertOne(data);
  }

  export function updateStudent(id,updatedData){
    return client
    .db("guvi")
    .collection("students")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:updatedData});
  }

  export function deleteStudent(id){
    return client
    .db("guvi")
    .collection("students")
    .deleteOne({_id: new ObjectId(id)});
  }