import express from "express";
import cors from "cors";
import connectDB from "./Config/Db.js";
import foodRouter from "./router/food-router.js";
import userRouter from "./router/user-router.js";
import cartRouter from "./router/cart-router.js";
import orderRouter from "./router/order-router.js";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });
console.log("KEY:", process.env.TESTAPI_KEY);
//database connection
connectDB();

//app config
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/food",foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("server is running");
})


app.listen(PORT,()=>{
 console.log(`Server running on http://localhost:${PORT}`);
})