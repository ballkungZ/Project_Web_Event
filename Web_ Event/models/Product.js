const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Faculty:  String,
    Email: String,
    Year: Number
});

module.exports = mongoose.model('Product',ProductSchema);


