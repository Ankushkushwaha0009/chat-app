import jwt from "jsonwebtoken" ; 
import User from "../models/user.models.js";
const protectRoute = async(req , res , next)=>{
    try {
        const token = req.cookies.jwt ; 
        // console.log("Token" , token)  ; 
        if(!token) {
            return res.status(401).json({error : "Unauthorized - No token is provided"})
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ; 
        // console.log("Decoded : " , decoded) ; 

        if(!decoded) {
            return res.status(401).json({error :  "Unauthorized Invalid token"}) ; 
        }
        const user = await User.findById(decoded.userId).select("-password") ; 
        // console.log("User : " , user) ; 
        
        if(!user) {
            return res.status(404).json({error : "User not found"}) ; 
        }
        req.user = user ; 
        next() ; 
    }
    catch(error){
        console.log("Error in protectedRoute middleware" , error.message) ; 
        res.status(500).json({error : "Internal server error"})  ; 
    }
}
export default protectRoute ;