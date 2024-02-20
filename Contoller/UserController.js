require("dotenv").config();
const mongoose = require("mongoose")
const users = require("../Model/UserSchema")
const jwt = require("jsonwebtoken")
const joiUserSchema = require('../Model/validateUserSchema')
const bcrypt = require("bcrypt")
const Products = require("../Model/ProductSchema");
const UserSchema = require("../Model/UserSchema");


mongoose.connect("mongodb://localhost:27017/Users")

module.exports = {
    
    userRegister: async (req,res) => {
        // console.log(req.body)
        const {value, error} = joiUserSchema.validate(req.body)
        const {name,email,username,password} = value;
        const hashedPassword = await bcrypt.hash(password, 10)

        if(error){
            res.status(404).json({
                status: "error",
                message: "Invalid User",
            });
        }

        await users.create({
            name:name,
            email:email,
            username:username,
            password:hashedPassword
        });

        res.status(200).json({
            status:"success",
            message:"Registration successfull"
        });
    },

    userLogin: async (req,res) => {
        
        const {value, error} = joiUserSchema.validate(req.body)
        
        if(error){
            return res.json(error.message)
        }

        const {email, password} = value
        const user = await users.findOne({
            email:email
        })
        // console.log(user)

        const id = user.id;

        if(!user){
            return res.status(404).json({
                status: "error",
                message: "User not found...!"
            })
        }

        if(!password || !user.password){
            return res.status(400).json({
                status: "error",
                message: "Invalid input...!"
            })
        }

        const matchPassword = await bcrypt.compare( password,user.password)

        if(!matchPassword){
            return res.status(401).json({
                status: "error",
                message:"Incorrect password...!"
            })
        }

        const token = jwt.sign({email: user.email}, process.env.USER_ACCESS_TOKEN_SECRET, {
            expiresIn: 86400
        })
        
        res.status(200).json({
            status: "success",
            message:"Login Successfull",
            data:{id,email,token}
        })
    
    },

    viewProduct :async (req,res) => {
        
        const products = await Products.find();

        if(!products){
            return res.status(404).json({
                status:"error",
                message:"Products not found....!"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"Product fetched Successfully"
        })
    },

    viewProductById: async (req,res) => {
        
        const productId = req.params.id; 
        const product = await Products.findById(productId);

        if(!product){
            return res.status(404).json({
                status:"error",
                message:"Product not found...!" 
            })
        }

        res.status(200).json({
            status:"success",
            message:"Product fetched successfully",
            data:product
        })
    },

    viewProductsByCategory : async (req,res) => {

        const category = req.params.category;
        const products = await Products.find({category:category})

        if(!products){
            res.status(404).json({
                status:"error",
                message:"Category not found...!"
            })
        }

        res.status(200).json({
            status:"success",
            message:"Category Fetched Successfully",
            data:products
        })

    },

    addToCart: async (req,res) => {

        const userId = req.params.id;
        // console.log(typeof(userId))
        const user = await UserSchema.findById(userId)

        if(!user){
            return res.status(404).json({
                status:"error",
                message:"User not found...!"
            })
        }

        const productId = req.body;

        if(!productId){
            return res.status(404).json({
                status:"error",
                message:"Product not found...!"
            })
        }

      
    }

}   
