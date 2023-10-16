
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js"; 
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import cartRouter from './routes/cart.js'
import orderRouter from './routes/order.js'
import stripeOrder from './routes/stripe.js'
import moreProduct from "./routes/moreProducts.js";
import cors from "cors"
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB is connected"))
  .catch(err => console.error(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const router = express.Router();

app.use(cors())
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', stripeOrder);
app.use('/api/moreProducts', moreProduct);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
