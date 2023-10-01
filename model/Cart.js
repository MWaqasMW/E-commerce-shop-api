import mongoose from "mongoose";

const CartSchema = new  mongoose.Schema(
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
            }
        }
      ],
      timestamp: { type: Date, default: Date.now }


    },
    
    )
const Cart = mongoose.model("Cart",CartSchema)

    export default Cart