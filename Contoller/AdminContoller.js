require("dotenv").config();
const jwt = require("jsonwebtoken")
const Users = require("../Model/UserSchema")
const Products = require

module.exports = {
    
    adminLogin : (req,res) => {
        const {email,password} = req.body;

        if(
            email == process.env.ADMIN_EMAIL &&
            password == process.env.ADMIN_PASSWORD )
            {
            
                const token = jwt.sign({email}, process.env.ADMIN_ACCESS_TOKEN_SECRET)

                return res.status(200).json({
                    status:"success",
                    message:"Admin Logged in successfully",
                    data: token
                })
            }
        else{
            return res.status(404).json({
                status:"error",
                message:"Admin not found...!",
            })
        }
    },

    viewUsers : async (req,res) => {
        const allUsers = await Users.find()
        // console.log(allUsers);
    
        if(allUsers.length === 0){
            res.status(404).json({
                status:"error",
                message:"Users not found...!"
            })
        }

        return res.status(200).json({
            status:"success",
            message:"Fetched users successfully",
            data:allUsers
        })
    },

    viewUserById : async (req,res) => {
        const userId = req.params.id;
        const userData = await Users.findById(userId)

        if(!userData){
            res.status(404).json({
                status:"error",
                message:"User not found...!"
            })
        }
        res.status(200).json({
            status:"success",
            message:"Successfully fetched the user",
            data:userData
        })
    },

    addProducts : async (req,res) => {
        const {value,error} = joiProductSchema.validate(req.body)

        if(error){
            res.status(404).json({
                status:"error",
                message:error.details[0].message
            })
        }

        const {name,category,imageUrl,price} = value
        await Products.create({
            name,
            category,
            imageUrl,
            price,
        })
        return res.status(200).json({
            status:"success",
            message:"Product added successfully",
            data: Products
        })
    },

}