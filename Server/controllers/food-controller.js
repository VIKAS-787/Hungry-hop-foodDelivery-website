import foodModel from "../models/foods.js";
import fs from "fs";

//add for post request
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding food",
      error: err.message,
    });
  }
};

// get all foods
const listFoods = async (req,res)=>{
  try{

    const foods = await foodModel.find({});
    res.status(200).json({
      success:true,
      message:"Foods fetched successfully",
      data:foods
    })
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Error fetching foods",
      error:err.message
    })
  }
}

// delete food by id 
const deleteFood = async(req,res)=>{
  try{
      const foodId = req.params.id;
      const food = await foodModel.findById(foodId);
      if(!food){
          return res.status(404).json({
              success:false,
              message:"Food not found"
          })
      } 
      // delete image file
      const imagePath = `uploads/${food.image}`;
      if(fs.existsSync(imagePath)){
          fs.unlinkSync(imagePath);
      }
      await foodModel.findByIdAndDelete(foodId);
      res.status(200).json({
          success:true,
          message:"Food deleted successfully"
      })
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Error deleting food",
      error:err.message
    })
  }
}

export { addFood, listFoods, deleteFood };