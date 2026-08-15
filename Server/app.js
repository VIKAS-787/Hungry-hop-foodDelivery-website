import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./Config/Db.js";
import foodRouter from "./router/food-router.js";
import userRouter from "./router/user-router.js";
import cartRouter from "./router/cart-router.js";
import orderRouter from "./router/order-router.js";

dotenv.config();

// Database connection
connectDB();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});