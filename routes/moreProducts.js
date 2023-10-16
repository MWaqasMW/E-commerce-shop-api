// Import required modules using ES6 syntax
import express from 'express';
import { authorizedTokenbyAdmin } from './verifyToken.js';
import MoreProducts from '../model/MoreProducts.js';

const router = express.Router();

// PRODUCT POST
router.post('/', authorizedTokenbyAdmin, async (req, res) => {
  const newProduct = new MoreProducts(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

// UPDATED PRODUCT
router.put("/:id",authorizedTokenbyAdmin, async(req,res)=>{
try{

const updatedProduct = await MoreProducts.findByIdAndUpdate(req.params.id,{
    $set:req.body

})

res.status(200).json(updatedProduct)

}catch(err){
res.status(403).json(err.message)
}

})

//DELETE 

router.delete("/:id",authorizedTokenbyAdmin, async(req,res)=>{

  try{

    await Product.findByIdAndDelete(req.params.id) 
res.status(200).json("Product has been deleted")
  }catch(err){
    res.status(500).json(err.message)
  }
})


// // GET product BY ID
router.get("/find/:id", async(req,res)=>{

  try{
const product = await MoreProducts.findById(req.params.id);

      res.status(200).json(product)

}catch (err){
  res.status(500).json("product Id is wrong")
}




})




// // GET ALL product

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategoriey = req.query.categories; 
  
    try {
      let products;
  
      if (qNew) {
        // Filter products by new product
        products = await MoreProducts.find().sort({ timestamp: -1 }).limit(5);
      } else if (qCategoriey) { // Fix the typo
        // Filter products by categories
        products = await MoreProducts.find({
          categories: {
            $in: [qCategoriey],
          },
        });
      } else {
        products = await MoreProducts.find();
      }
  
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


  



// })



export default router
