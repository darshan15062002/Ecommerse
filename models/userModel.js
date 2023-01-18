const mongoose = require('mongoose')
const validator = require('validator')
const bcriptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter username"],
        maxLength: [30, 'username can not exceed 30 characters'],
        minLength: [4, 'username can not less then 4 characters']
    },
    email: {
        type: String,
        required: [true, "please enter email"],
        validator: [validator.isEmail, 'please enter valide email'],
        unquie: true,
    }, password: {
        type: String,
        required: [true, "please enter password"],
        minLength: [8, 'password must greter than 8 charaters'],
        select: false
    },
    awatar: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcriptjs.hash(this.password, 10)
})
//JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SCREAT, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
// comapirPassword
// here we use the function instead of arrow funtion because we can't use this.password in arrow function
userSchema.methods.compairPassword = async function (enterPassword) {
    return bcriptjs.compare(enterPassword, this.password)
}
module.exports = mongoose.model("User", userSchema)