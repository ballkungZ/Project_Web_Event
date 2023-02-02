const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Username: {
        type:String,
        require:true
    },
    Password: {
        type:String,
        require:true
    },
    Faculty:  {
        type:String,
        require:true
    },
    Email: {
        type:String,
        require:true,
        unique:true
    },
    Year: {
        type:String,
        require:true
    },
});

const Register = new mongoose.model("Register",ProductSchema);

module.exports = Register;

