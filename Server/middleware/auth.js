import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "No token, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; 
    next();
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;