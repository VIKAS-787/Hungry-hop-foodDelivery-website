import express from "express";
import {
  placeOrder,
  usersOders,
  verifyOrder,
  orderLists,
  updateStatus,
} from "../controllers/order-controller.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/myorders", authMiddleware, usersOders);
orderRouter.get("/list", orderLists);
orderRouter.post("/status", updateStatus);

export default orderRouter;
