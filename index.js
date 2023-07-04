import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './Routers/users.js';
import { isAuthenticated } from './Routers/Authentication/auth.js';
import cors from 'cors';
import { Inventoryrouter } from './Routers/inventory.js';


dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cors());

app.use("/inventory",isAuthenticated,Inventoryrouter)
app.use("/users",userRouter)

app.listen(PORT,()=>console.log(`Server started in localhost:9090`))