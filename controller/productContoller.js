const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/productModel');
const Errorhander = require('../utils/errorhandler');

const ApiFeatures = require('../utils/apifeature');





exports.getAllProduct = catchAsyncError(async (req, res, next) => {
    const pagination = 5;
    const productCount = await Product.countDocuments()

    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(pagination)
    const product = await apifeatures.query;
    res.status(200).json({
        success: true,
        product
    })
})




exports.createProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product,
        productCount
    })
});




exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new Errorhander('product not fount', 404))

    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })

    res.status(200).json({
        success: true,
        product
    })
})




exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new Errorhander('product not fount', 404))

    }
    product.remove();
    res.status(200).json({
        success: true,
        message: 'product deleted successfully'
    })
})





exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new Errorhander('product not fount', 404))
    }
    res.status(200).json({
        success: true,
        product
    })

}
)