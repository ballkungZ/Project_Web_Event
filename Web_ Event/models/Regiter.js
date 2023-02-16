const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const UserSchema = new mongoose.Schema({
    Username: {
        type:String,
        required:true
    },
    Password: {
        type:String,
        required:true
    },
    Faculty:  {
        type:String,
        required:true
    },
    Email: {
        type:String,
        required:true,
        unique:true
    },
    Year: {
        type:String,
        required:true
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports  = mongoose.model("Register",UserSchema);



