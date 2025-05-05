import express from "express"
import { Getuser, deleteUser } from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

console.log("Admin routes loaded");


const Adminroutes = express.Router();

Adminroutes.get('/getuser', isAdmin ,Getuser)
Adminroutes.post('/delete/:id', isAdmin ,deleteUser)

export default Adminroutes;