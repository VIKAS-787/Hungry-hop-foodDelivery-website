import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'

// login user
export const loginUser = async(req,res) =>{
 const {email,password} = req.body;
 try{
    const user = await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User doesn't exist"})
    }
    const isMatch  = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true,token})
 }catch(err){
   console.log(err);
   res.json({success:false,message:"Some this Went Wrong"})
 }
}
const createToken = (id) => {
   return jwt.sign({id},process.env.JWT_SECRET )
}
// register user
export const registerUser = async(req,res) =>{
   const {name,email,password} = req.body;
   try{
     //checking user already exists 
    const exists = await userModel.findOne({email});
    if(exists){
        return res.json({success:false,message:"User Already Exists"});
    }

     //validating user and create a strong password
     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Plase Enter Valid Email"});
     }
     
     if(password.length<8){
        return res.json({success:false,message:"Plase Enter a Strong Password"})
     }
     // hassing to create a jwt and bcrypt
     const salt =  await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password,salt);

     const newUser = new userModel({
        name:name,
        email:email,
        password:hashPassword
     });
     const user = await newUser.save();
     const token = createToken(user._id);
     res.json({success:true,message:token})
   
   }
   catch(err){
     console.log(err);
     res.json({success:false,message:err})
   }
}

export default {loginUser,registerUser}