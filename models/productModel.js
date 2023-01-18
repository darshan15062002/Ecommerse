const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trime: true,
    },
    discription: {
        type: String,
        required: [true, 'please enter product discription']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        maxLength: [8, 'price cannot excced 8 digit'],

    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true
        }
    }],
    catogory: {
        type: String,
        required: [true, 'please enter product catogory'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter product stock'],
        maxLength: [4, 'stock cannot excced 4 digit'],
        default: 1
    },
    noOfreview: {
        type: Number,
        default: 0

    },
    review: [{
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    ceatedAt: {
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.model("Product", productSchema)