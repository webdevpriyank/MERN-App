const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('./../models/userModel');


// @desc    Register User
// @route   POST /api/v1/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    
    // Get user data from request body
    const { name, email, password } = req.body;
    // console.log(name, email, password)
    
    // Check if there is a data for the user in request body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide a name, email and password')
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if(userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            message: 'User created successfully',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not created')
    }
})


// @desc    Login User
// @route   POST /api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    // Get user data from request body
    const { email, password } = req.body;

    // Check if there is a data for the user in request body
    if(!email || !password) {
        res.status(400)
        throw new Error('Please provide a email and password')
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: 'User logged in successfully',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Get User Data
// @route   POST /api/v1/users/me
// @access  Private
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN 
    })
}

module.exports = { registerUser, loginUser, getMe }