import mongoose from "mongoose";

const OrderSchema = new  mongoose.Schema(
{
    userId: {
        type: String,
        required: true,
        unique: true,
      
      },
      products: [
        {
            productId:{
                type: String,
                required: true,
                unique: true,
            },
            quantity:{
                type: Number,
                default:1,
            },
        },
    ],
    amount:{type:Number,required: true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"},
    timestamp: { type: Date, default: Date.now }
    },
    
    )
const Order = mongoose.model("Order",OrderSchema)

    export default Order