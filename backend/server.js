import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieparser from "cookie-parser"
import DbCon from './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import Adminroutes from './routes/AdminRouts.js'
 
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()


// mongodb

DbCon()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use(cookieparser())


//api

app.use('/api/auth', AuthRoutes)
app.use('/api/admin', Adminroutes)

app.get('/', (req,res)=>{
    res.send("test")
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})