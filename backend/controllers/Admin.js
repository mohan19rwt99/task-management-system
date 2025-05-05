import UserModel from "../models/user.js";

export const Getuser = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({users})
        
    } catch (error) {
        res.status(500).json({ message: "internsal Server error" });
        console.log(error)
    }
};

export const deleteUser =async (req,res)=>{
    try {
        const userId= req.params.id;

        const checkAdmin = await UserModel.findById(userId)

        if(checkAdmin.role === "admin"){
            return res.status(409).json({message:"You can not delete yourself"})
        }
        const user= await UserModel.findByIdAndDelete(userId)

        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        res.status(500).json({message:"user susccfully deleted"})
    } catch (error) {
        res.status(500).json({ message: "internsal Server error" });
        console.log(error)
    }
}
