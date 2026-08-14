import express from "express";
const foodRouter = express.Router();
import multer from "multer";
import { addFood, listFoods, deleteFood} from "../controllers/food-controller.js";

// image storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// controllers
foodRouter.post("/add", upload.single("image"), addFood);
// get all foods 
foodRouter.get("/list", listFoods);
// delete food by id 
foodRouter.delete("/remove/:id", deleteFood);


export default foodRouter;
