import mongoose from "mongoose";

const MoreProductSchema = new  mongoose.Schema(
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
      categories: {
        type: Array,
        
      },
      size: {
        type: Array,
     
      },
      color: {
        type: Array,
        
      },
      price: {
        type: Number,
        required: true,
      },
      inStock:{
        type:Boolean,
        default:true,
      },
      timestamp: { type: Date, default: Date.now }

    },
    
    )

    const MoreProducts = mongoose.model("MoreProducts",MoreProductSchema)

    export default MoreProducts