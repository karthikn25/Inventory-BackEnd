import express from 'express';
import { addStudents, deleteStudent, getAllStudents, getStudentsById, updateStudent } from '../Controllers/students.js';
import jwt from 'jsonwebtoken'

const router = express.Router();


router.get("/all",async (req,res)=>{
    try {
       if(req.query.experiance){
            req.query.experiance = +req.query.experiance ;
        }
    const students = await getAllStudents(req)
    if(!students){
        res.status(400).json({data:"User Not Found"})
        return
    }
     res.status(200).json({data: students})  
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})


router.get("/:id",async (req,res)=>{
    try {
      const {id} = req.params;
      const students = await getStudentsById(id);
      if(!students){
        res.status(400).json({data:"User Not Found"})
        return
      }
      res.status(200).json({data: students})  
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.post("/add", async(req,res)=>{
    try {
        const newStudent = req.body;
        
        if(!newStudent){
            res.status(400).json({data:"No details provided"})
            return
          }
          const result = await addStudents(newStudent);
          res.status(200).json({data: {result : result, message:"Added Successfully"}})  

    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.put("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedData = req.body;
        if(!id || !updatedData){
            res.status(400).json({data:"Wrong request"})
            return
        }
        const result =await updateStudent(id,updatedData)
        res.status(200).json({data: {result : result, message:"Updated Successfully"}}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.delete("/delete/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await deleteStudent(id)
        if(!id){
            res.status(400).json({data:"Wrong request"})
            return
        }
        res.status(200).json({result: result, message:"deleted successfully"})  
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

export const studentsrouter = router 


