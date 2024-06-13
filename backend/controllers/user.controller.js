import User from "../models/user.models.js";
export const getUsersForSidebar = async (req , res) => {
    try {
      const loggedInUserId = req.user._id ; 
      //this will find all the id except the id that is logged in 
      const filteredUSers = await User.find({_id  : {$ne :  loggedInUserId}}).select("-password") ; 
      res.status(200).json(filteredUSers) ; 
    }
    catch(error) {
        console.log("Error in getUserForSideBar" , error.message) ; 
        res.status(500).json({error : "Internal server error"}) ; 
    }
}