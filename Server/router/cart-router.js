import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addToCart, removeFromCart, getCart } from "../controllers/cart-controller.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/", authMiddleware, getCart);

export default cartRouter;