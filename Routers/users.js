import expree from 'express'
import { addUser, generateJwtToken, getUser } from '../Controllers/users.js';
import bcrypt from 'bcrypt'

const router = expree.Router();


router.post("/signup", async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const user =await getUser(req.body.email)
        const userinfo =req.body
        //const hashedUser = await req.body

        if(!user){
          const hashedPassword = await bcrypt.hash(req.body.password,salt);
          const hashedUser = await {...req.body,password:hashedPassword}
          const result =await addUser(hashedUser)
          return res.status(200).json({result,data:"Added successfully"
           
        })
        }
        
        res.status(400).json({data:"Email Already Exist"})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server error"})
    }
})

router.post("/login", async(req, res)=>{
    try {
        // is user available
        const user = await getUser(req.body.email);
        if(!user){
            return res.status(404).json({data:"Invalid Email"})
        }
        // is password valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(400).json({data:"Invalid Password"})
        }
        const token =  generateJwtToken(user._id);
        res.status(200).json({data:{
            message :"sucessfully loggedIn",
            token : token
        }})
    } catch (error) {
        console.log(error);
        res.status(500).json({ data: "Internal server Error", error: error }); 
    }
})
export const userRouter = router;
