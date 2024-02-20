const fs = require("fs")
const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination:path.join(__dirname,'uploads'),
    filename:(req,file,cb) =>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET, 
})


const imageUpload = (req,res,next) => {
    upload.single("image")(req,res,async (error) => {
        if(error){
                return res.status(400).json({
                    error: error.message
                })
        }
        if(!req.file){
            res.status(404).json({
                status:"error",
                message:"No file Uploaded...!"
            })
        }
        try{
            const result = await cloudinary.uploader.upload(req,file.path,{folder:"Ecomerce-images"})
            req.body.image = result.secure_url;
        

        fs.unlink(req.file.path, (unlinker) => {
            if(unlinker){
                console.log("error deleting local file",unlinker);
            }
        })
        next();
    }
    catch{
        return res.status(500).json({
            message:"Error uploading file to cloudinary",
        })
    }
    })
}


module.exports = imageUpload;