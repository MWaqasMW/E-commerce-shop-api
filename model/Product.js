import mongoose from "mongoose";

const ProductSchema = new  mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
        required: true,
      
      },
      img: {
        type: String,
        required: true,
      },
      catergoires: {
        type: Array,
        
      },
      size: {
        type: String,
     
      },
      color: {
        type: String,
        
      },
      price: {
        type: Number,
        required: true,
      },
      timestamp: { type: Date, default: Date.now }

    },
    
    )

    const Product = mongoose.model("Product",ProductSchema)

    export default Product