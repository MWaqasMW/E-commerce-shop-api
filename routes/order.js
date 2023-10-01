import express from 'express';
import { authorizedToken, authorizedTokenbyAdmin, verifyToken } from './verifyToken.js';
import Order from '../model/Order.js';

const router = express.Router();

// PRODUCT POST
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
 
try {
    console.log(newOrder);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

// UPDATED PRODUCT
router.put("/:id",authorizedTokenbyAdmin, async(req,res)=>{
try{

const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
    $set:req.body

})

res.status(200).json(updatedCart)

}catch(err){
res.status(403).json(err.message)
}

})

// //DELETE 

router.delete("/:id",authorizedTokenbyAdmin, async(req,res)=>{

  try{

    await Order.findByIdAndDelete(req.params.id) 
res.status(200).json("Order has been deleted")
  }catch(err){
    res.status(500).json(err.message)
  }
})


// // // GET ORDER BY UserID
router.get("/find/:userId",authorizedToken, async(req,res)=>{

  try{
const order = await Order.find({userId : req.params.id});

      res.status(200).json(order)

}catch (err){
  res.status(500).json("Order Id is wrong")
}




})




// // // GET ALL 

router.get("/",authorizedTokenbyAdmin, async(req,res)=>{
try{

    const order = await  Order.find()
    res.status(200).json(order)

}catch(err){
res.status(403).json(err.message)
}
})



//GET MONTHLY INCOME

router.get('/income',authorizedTokenbyAdmin,async(req,res)=>{
    const date= new Date;
    const lastMonth= new Date(date.setMonth(date.getMonth()-1))
    const perviousMonth= new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try{
        const income = await Order.aggregate([
            {
              $match: {
                timestamp: { $gte: perviousMonth }
              }
            },
            {
              $project: {
                month: { $month: "$timestamp" },
                sales: "$amount"
              }
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" }
              }
            }
          ]);
          
        res.status(200).json(income)

    }catch(err){
        res.status(404).json(err.message)
    }

})


export default router



