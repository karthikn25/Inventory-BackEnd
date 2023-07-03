import express from 'express'
import dotenv from 'dotenv'
import { studentsrouter } from './Routers/students.js';
import { userRouter } from './Routers/users.js';
import { isAuthenticated } from './Routers/Authentication/auth.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());

app.use("/students",isAuthenticated,studentsrouter)
app.use("/users",userRouter)

app.listen(PORT,()=>console.log(`Server started in localhost:9090`))