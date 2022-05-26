const mongoose = require('mongoose')

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) 
