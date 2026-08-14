import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

let razorpay;
const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.TESTAPI_KEY,
      key_secret: process.env.TESTAPI_SECRET,
    });
  }
  return razorpay;
};

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.user,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.user, { cartData: {} });

    const razorpayInstance = getRazorpay();

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `order_${newOrder._id}`,
    };

    const order = await razorpayInstance.orders.create(options);

    newOrder.razorpay_order_id = order.id;
    await newOrder.save();

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      key: process.env.TESTAPI_KEY,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.json({ success: false });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.TESTAPI_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await orderModel.findOneAndUpdate(
        { razorpay_order_id },
        {
          payment: true,
          razorpay_payment_id,
        },
      );

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.json({ success: false });
  }
};

export const usersOders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.user,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log("USER ORDERS ERROR:", err);
    res.json({ success: false });
  }
};

export const orderLists = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (err) {
    console.log("Orders list Error", err);
    res.json({ success: false });
  }
};
export const updateStatus = async (req, res) => {

  try {

    await orderModel.findByIdAndUpdate(
      req.body.orderId,
      {
        status: req.body.status
      }
    );

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (err) {

    console.log(err);

    res.json({
      success: false,
      message: "Error"
    });

  }

}
