import express from 'express';
import { authorizedToken, authorizedTokenbyAdmin, verifyToken } from './verifyToken.js';
import Cart from '../model/Cart.js';

const router = express.Router();

// PRODUCT POST
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

// UPDATED PRODUCT
router.put("/:id",authorizedToken, async(req,res)=>{
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

router.delete("/:id",authorizedToken, async(req,res)=>{

  try{

    await Cart.findByIdAndDelete(req.params.id) 
res.status(200).json("Cart has been deleted")
  }catch(err){
    res.status(500).json(err.message)
  }
})


// // // GET Cart BY UserID
router.get("/find/:userId",authorizedToken, async(req,res)=>{

  try{
const cart = await Cart.findOne({userId : req.params.id});

      res.status(200).json(cart)

}catch (err){
  res.status(500).json("product Id is wrong")
}




})




// // // GET ALL 

router.get("/",authorizedTokenbyAdmin, async(req,res)=>{
try{

    const carts = await  Cart.find()
    res.status(200).json(carts)

}catch(err){
res.status(403).json(err.message)
}
})

export default router
