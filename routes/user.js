import  express from "express";
import { authorizedToken,authorizedTokenbyAdmin } from "./verifyToken.js";
import CryptoJS from "crypto-js";
import User from "../model/User.js";
import moment from "moment";
const router = express.Router()

//UPDATED USER
router.put("/:id",authorizedToken, async(req,res)=>{
if(req.body.password){
     req.body;
  req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();

}
try{

const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:req.body

})

res.status(200).json(updatedUser)

}catch(err){
res.status(403).json(err.message)
}

})

//DELETE 

router.delete("/:id",authorizedTokenbyAdmin, async(req,res)=>{

  try{

    await User.findByIdAndDelete(req.params.id) 
res.status(200).json("user has been deleted")
  }catch(err){
    res.status(500).json(err.message)
  }
})


// GET USER BY ID
router.get("/find/:id",authorizedTokenbyAdmin, async(req,res)=>{

  try{
const user = await User.findById(req.params.id);

      const {password , ...other}=user._doc
      res.status(200).json(other)

}catch (err){
  res.status(500).json("User Id is wrong")
}




})




// GET ALL USER

router.get("/", authorizedTokenbyAdmin, async (req, res) => {
  const query = req.query.new;
  console.log(query);
  try {
    let users;

    if (query) {
      users = await User.find().sort({ _id: -1 }).limit(5);
    } else {
      users = await User.find();
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// USER STATS

const currentDateAndTime = moment();

router.get("/stats",authorizedTokenbyAdmin, async(req,res)=>{
  const lastYear = new Date(); // Example: Set last year's date here
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  
  try {
    const result = await User.aggregate([
      {
        $match: { timestamp: { $gte: lastYear } }
      },
      {
        $project: {
          month: { $month: "$timestamp" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);
  
    // Handle the result here, it will contain the aggregated data.
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
    
    // Handle the error as needed
  }
  
  



})



export default router



