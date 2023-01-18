const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const Errorhander = require('../utils/errorhandler');
const sendToken = require('../utils/jwtToken');


exports.createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is avatar",
            url: "this is avatar"
        }
    })
    sendToken(user, res, 200)
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new Errorhander("please enter email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new Errorhander("invalid email and password", 401))
    }
    // compairing password
    const isPasswordMatch = user.compairPassword(password)

    if (!isPasswordMatch) {
        return next(new Errorhander("invalid email and password", 401))
    }
    sendToken(user, res, 200)
})