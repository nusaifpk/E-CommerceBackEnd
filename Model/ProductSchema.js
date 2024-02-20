const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    
    name: String,
    category: String,
    imageUrl: String,
    price: Number,
})

module.exports = mongoose.model('product',productSchema);