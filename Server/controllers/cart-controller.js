import userModel from "../models/userModel.js";

// ✅ ADD
export const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.body;

    let user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    let cartData = user.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ REMOVE
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.body;

    let user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ GET
export const getCart = async (req, res) => {
  try {
    const userId = req.user;

    let user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};