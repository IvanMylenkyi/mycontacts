const mongoose = require("mongoose");
const { user } = require("../routes/userRoutes");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"Add the user name"],
    },
    email:{
        type: String,
        required: [true,"Add the user email adress"],
        unique: [true,"Email adress already taken"],
    },
    password:{
        type: String,
        required: [true,"Add the user password"]
    },
},{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema);