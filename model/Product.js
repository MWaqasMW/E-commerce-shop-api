import mongoose from "mongoose";

const ProductSchema = new  mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        unique: true,
      },
   
      img: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        
      },
      inStock:{
        type:Boolean,
        default:true,
      },
      timestamp: { type: Date, default: Date.now }

    },
    
    )

    const Product = mongoose.model("Product",ProductSchema)

    export default Product