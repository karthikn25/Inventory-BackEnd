import express from 'express';
import { addInventory,deleteInventory,getAllInventory,getInventoryById, updateInventory } from '../Controllers/inventory.js';


const router = express.Router();


router.get("/all",async (req,res)=>{
    try {
       if(req.query.amount){
            req.query.amount = +req.query.amount ;
        }
    const inventory = await getAllInventory(req)
    if(!inventory){
        res.status(400).json({data:"Inventory Not Found"})
        return
    }
     res.status(200).json({data: inventory})  
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})


router.get("/:id",async (req,res)=>{
    try {
      const {id} = req.params;
      const inventory = await getInventoryById(id);
      if(!inventory){
        res.status(400).json({data:"Inventory Not Found"})
        return
      }
      res.status(200).json({data: inventory})  
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.post("/add", async(req,res)=>{
    try {
        const newInventory = req.body;
        
        if(!newInventory){
            res.status(400).json({data:"No details provided"})
            return
          }
          const result = await addInventory(newInventory);
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
        const result =await updateInventory(id,updatedData)
        res.status(200).json({data: {result : result, message:"Updated Successfully"}}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.delete("/delete/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await deleteInventory(id)
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

export const Inventoryrouter = router 


