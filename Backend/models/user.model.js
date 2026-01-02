import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },

    mobileNo:{
        type: String,
        required: true,
        unique: true,
    },

    isMobileVerified: {
        type: Boolean,
        default: false,
    },

    email:{
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    pin:{
        type: String,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

