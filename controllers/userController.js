const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/userRoutes");
// @desc Register a user
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAviable = await User.findOne({ email });
    if (userAviable){
        res.status(400);
        throw new Error("User already registred!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });
    console.log(`User created ${user}`);
    if (user){
        res.status(201).json({_id: user.id, email: user.email });
    }
    else{
        res.status(400);
        throw new Error("Invalid user data")
    }
    res.json({message: "Register the user"});
});


// @desc Login a user
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({email});
    //compare passwoed with hashpassword
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },

        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:'15m' }
        );
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("email or password in not valid")
    }
});


// @desc Register a user
// @route get api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports={ registerUser, loginUser, currentUser };